import { createStore, Middleware, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    process.env.NODE_ENV !== "production" && logger,
    sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
