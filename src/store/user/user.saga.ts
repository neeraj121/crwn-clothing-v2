import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import { all, call, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import {
    AdditionalInformation,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import { emailSignInStart, signInFailed, signInSuccess } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

type UserSnapshot = SagaReturnType<typeof createUserDocumentFromAuth>;
type UserCredential = SagaReturnType<typeof signInWithGooglePopup>;
type CurrentUser = SagaReturnType<typeof getCurrentUser>;

export function* getUserDocumentFromAuth(
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
//Call getUserDocumentFromAuth - save in db and update state
export function* signInWithGoogle(): Generator {
    try {
        const userAuth = yield call(signInWithGooglePopup);
        const { user } = userAuth as UserCredential;
        yield call(getUserDocumentFromAuth, user);
    } catch (error) {
        yield put(signInFailed(error as string));
    }
}

export function* signInWithEmail(
    action: ReturnType<typeof emailSignInStart>
): Generator {
    const {
        payload: { email, password },
    } = action;
    try {
        const userAuth = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        const { user } = userAuth as UserCredential;
        yield call(getUserDocumentFromAuth, user);
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

export function* isUserAuthenticated(): Generator {
    try {
        const userAuth = yield call(getCurrentUser);
        const userAuthTyped = userAuth as CurrentUser;
        if (!userAuthTyped) return;
        yield call(getUserDocumentFromAuth, userAuthTyped);
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

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
    ]);
}
