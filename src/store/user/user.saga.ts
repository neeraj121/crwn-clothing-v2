import { User } from "firebase/auth";
import { all, call, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import {
    AdditionalInformation,
    createUserDocumentFromAuth,
    getCurrentUser,
} from "../../utils/firebase/firebase.utils";
import { signInFailed, signInSuccess } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

type UserSnapshot = SagaReturnType<typeof createUserDocumentFromAuth>;

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

export function* isUserAuthenticated(): Generator {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getUserDocumentFromAuth, userAuth as User);
    } catch (error) {
        yield put(signInFailed(error as string));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
    yield all([call(onCheckUserSession)]);
}
