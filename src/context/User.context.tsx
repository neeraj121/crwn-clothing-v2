import React, { createContext, useState, useEffect } from "react";
import { MyUser, UserContextType } from "../@types/user";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext<UserContextType>({
    currentUser: null,
});

export const UserProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<MyUser>(null);
    const value = { currentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
