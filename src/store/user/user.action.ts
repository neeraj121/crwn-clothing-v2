import { MyUser, USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user: MyUser) => ({
    type: USER_ACTION_TYPES.SET_CURRENT_USER,
    payload: user,
});

export const checkUserSession = () => ({
    type: USER_ACTION_TYPES.CHECK_USER_SESSION,
});

export const googleSignInStart = () => ({
    type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (email: string, password: string) => ({
    type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    payload: { email, password },
});

export const signInSuccess = (user: MyUser) => ({
    type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    payload: user,
});

export const signInFailed = (error: string) => ({
    type: USER_ACTION_TYPES.SIGN_IN_FAILED,
    payload: error,
});
