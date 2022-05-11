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
    signInWithRedirect,
    UserCredential,
    NextOrObserver,
} from "firebase/auth";
import {
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    collection,
    writeBatch,
    QueryDocumentSnapshot,
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
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, provider);

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

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
        (docSnapshot) => docSnapshot.data() as FirestoreCategory
    );
};

export type AdditionalInformation = {
    displayName?: string;
};

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation: AdditionalInformation = {}
) => {
    if (!userAuth) return null;

    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log("Error creating user", error);
            return null;
        }
    }

    return userSnapshot as QueryDocumentSnapshot<User>;
};

export const createAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<UserCredential | void> => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<UserCredential | void> => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};
