import { User } from "firebase/auth";

export type MyUser = (User & { id: string }) | null;

export enum USER_ACTION_TYPES {
    SET_CURRENT_USER = "user/SET_CURRENT_USER",
    CHECK_USER_SESSION = "user/CHECK_USER_SESSION",
    GOOGLE_SIGN_IN_START = "user/GOOGLE_SIGN_IN_START",
    EMAIL_SIGN_IN_START = "user/EMAIL_SIGN_IN_START",
    SIGN_IN_SUCCESS = "user/SIGN_IN_SUCCESS",
    SIGN_IN_FAILED = "user/SIGN_IN_FAILED",
}

export type UserState = {
    currentUser: MyUser;
    isLoading: boolean;
    error: null | string;
};
