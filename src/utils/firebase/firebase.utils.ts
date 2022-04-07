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
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { AdditionalUserData } from "../../@types/user";

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
