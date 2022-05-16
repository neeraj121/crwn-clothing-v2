import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import { all, call, put, SagaReturnType, takeLatest } from "redux-saga/effects";
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
    emailSignInStart,
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpStart,
    signUpSuccess,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

type UserSnapshot = SagaReturnType<typeof createUserDocumentFromAuth>;
type UserCredential = SagaReturnType<typeof signInWithGooglePopup>;
type CurrentUser = SagaReturnType<typeof getCurrentUser>;

export function* getSnapshotFromUserAuth(
    userAuth: User,
    additionalDetails: AdditionalInformation = {}
): Generator {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        const userSnapshotTyped = userSnapshot as UserSnapshot;
        if (userSnapshotTyped) {
            yield put(
                signInSuccess({
                    id: userSnapshotTyped.id,
                    ...userSnapshotTyped.data(),
                })
            );
        }
    } catch (error) {
        yield put(signInFailed(error as string));
    }
}

//Call signInWithGooglePopup - get user auth
//Call getSnapshotFromUserAuth - save in db and update state
export function* signInWithGoogle(): Generator {
    try {
        const userAuth = yield call(signInWithGooglePopup);
        const { user } = userAuth as UserCredential;
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error as string));
    }
}

export function* signInWithEmail(
    action: ReturnType<typeof emailSignInStart>
): Generator {
    const { email, password } = action.payload;
    try {
        const userAuth = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        const { user } = userAuth as UserCredential;
        yield call(getSnapshotFromUserAuth, user);
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
        yield put(signInFailed(error as string));
    }
}

export function* signUp(action: ReturnType<typeof signUpStart>): Generator {
    const { email, password, displayName } = action.payload;
    try {
        const userAuth = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );
        const { user } = userAuth as UserCredential;
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        if (
            error instanceof FirebaseError &&
            error.code === "auth/email-already-in-use"
        ) {
            alert("Cannot create user, email already in use");
        }
        yield put(signUpFailed(error as string));
    }
}

export function* signInAfterSignUp(
    action: ReturnType<typeof signUpSuccess>
): Generator {
    const { user, additionalDetails } = action.payload;
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut(): Generator {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error as string));
    }
}

export function* isUserAuthenticated(): Generator {
    try {
        const userAuth = yield call(getCurrentUser);
        const userAuthTyped = userAuth as CurrentUser;
        if (!userAuthTyped) return;
        yield call(getSnapshotFromUserAuth, userAuthTyped);
    } catch (error) {
        yield put(signInFailed(error as string));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}
