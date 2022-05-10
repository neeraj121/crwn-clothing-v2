import { createStore, applyMiddleware, AnyAction } from "redux";
import { rootReducer } from "./root-reducer";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

import logger from "redux-logger";
import thunk, { ThunkDispatch } from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];
process.env.NODE_ENV === "development" && middlewares.push(logger);
middlewares.push(thunk);

const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, composedEnhancers);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
