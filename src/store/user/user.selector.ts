import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.types";

const selectUserReducer = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (user: UserState) => user.currentUser
);
