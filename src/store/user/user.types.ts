import { User } from "firebase/auth";

export type MyUser = User | null;

export enum USER_ACTION_TYPES {
    SET_CURRENT_USER = "SET_CURRENT_USER",
}

export type UserState = {
    currentUser: MyUser;
};
