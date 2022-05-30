import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import { all, call, put, takeLatest } from "typed-redux-saga/macro";
import {
    AdditionalInformation,
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser,
} from "../../utils/firebase/firebase.utils";
import {
    EmailSignInStart,
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    SignUpStart,
    SignUpSuccess,
    signUpSuccess,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapshotFromUserAuth(
    userAuth: User,
    additionalDetails?: AdditionalInformation
) {
    try {
        const userSnapshot = yield* call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        if (userSnapshot && userSnapshot.exists()) {
            yield* put(
                signInSuccess({
                    ...userSnapshot.data(),
                    id: userSnapshot.id,
                })
            );
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

//Call signInWithGooglePopup - get user auth
//Call getSnapshotFromUserAuth - save in db and update state
export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithEmail(action: EmailSignInStart) {
    const { email, password } = action.payload;
    try {
        const userAuth = yield* call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        if (userAuth) {
            const { user } = userAuth;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect username/password");
                    break;
                case "auth/user-not-found":
                    alert("Incorrect username/password");
                    break;
                default:
                    console.log(error);
            }
        }
        yield* put(signInFailed(error as Error));
    }
}

export function* signUp(action: SignUpStart) {
    const { email, password, displayName } = action.payload;
    try {
        const userAuth = yield* call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );
        if (userAuth) {
            const { user } = userAuth;
            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch (error) {
        if (
            error instanceof FirebaseError &&
            error.code === "auth/email-already-in-use"
        ) {
            alert("Cannot create user, email already in use");
        }
        yield* put(signUpFailed(error as Error));
    }
}

export function* signInAfterSignUp(action: SignUpSuccess) {
    const { user, additionalDetails } = action.payload;
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield* takeLatest(
        USER_ACTION_TYPES.CHECK_USER_SESSION,
        isUserAuthenticated
    );
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}
