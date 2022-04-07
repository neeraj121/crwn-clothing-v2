import { User } from "firebase/auth";

export type AdditionalUserData = {
    displayName?: string;
};

export type MyUser = User | null;

export type UserContextType = {
    currentUser: MyUser;
};
