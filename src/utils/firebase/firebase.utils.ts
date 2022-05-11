import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    User,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    NextFn,
} from "firebase/auth";
import {
    collection,
    CollectionReference,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    writeBatch,
} from "firebase/firestore";
import { FirestoreCategory } from "../../store/categories/categories.types";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBA_ni1MpO9nEQcORTolnoHjJcG2nWwT0w",
    authDomain: "crown-cloud-db.firebaseapp.com",
    projectId: "crown-cloud-db",
    storageBucket: "crown-cloud-db.appspot.com",
    messagingSenderId: "572843641958",
    appId: "1:572843641958:web:c0c3d99631ab3315f5f1a7",
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

type ObjectsToAddType = {
    [key: string]: any;
};
export const addCollectionAndDocuments = async (
    collectionKey: string,
    objectsToAdd: ObjectsToAddType[],
    field: string
) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        if (object.hasProperty(field)) {
            const docRef = doc(collectionRef, object[field].toLowerCase());
            batch.set(docRef, object);
        }
    });
    await batch.commit();
    console.log("done");
};

const createCollectionReference = <T = DocumentData>(
    collectionName: string
) => {
    return collection(db, collectionName) as CollectionReference<T>;
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef =
        createCollectionReference<FirestoreCategory>("categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export type AdditionalUserData = {
    displayName?: string;
};

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation: AdditionalUserData = {}
) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log("Error creating user", error);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextFn<User | null>) =>
    onAuthStateChanged(auth, callback);
