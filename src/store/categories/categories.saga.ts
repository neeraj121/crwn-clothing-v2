import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
    fetchCategoriesError,
    fetchCategoriesSuccess,
} from "./categories.action";
import { CATEGORIES_ACTION_TYPES, FirestoreCategory } from "./categories.types";

export function* fetchCategoriesAsync(): Generator {
    try {
        const categories = yield call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categories as FirestoreCategory[]));
    } catch (error) {
        yield put(fetchCategoriesError(error as string));
    }
}

export function* onFetchCategories() {
    yield takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );
}

export function* categoriesSagas() {
    yield all([call(onFetchCategories)]);
}
