import { MyUser, USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user: MyUser) => ({
    type: USER_ACTION_TYPES.SET_CURRENT_USER,
    payload: user,
});
