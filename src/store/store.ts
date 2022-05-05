import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middlewares = [logger];
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, composedEnhancers);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
