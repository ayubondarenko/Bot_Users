/**
 * Created by alexander on 22.01.18.
 */
import axios from "axios";
import {delay} from "redux-saga";
import {all, call, fork, put, takeLatest} from "redux-saga/effects";

//
const addPageUrlToAnyPage = (data, url) => {
    // let currentPage = url.match(/page=(\d+?)&/)[1];
    const pageNumStart = url.indexOf('_page=') + 6;
    const pageNumEnd = url.indexOf('&', pageNumStart);

    let currentPage = +url.slice(pageNumStart, pageNumEnd);
    if (!currentPage) currentPage = 1;

    return {
        result: data.data,
        nextPageUrl: data.data.length ?
            url.slice(0, pageNumStart) + (currentPage + 1) + url.slice(pageNumEnd) : '',
        previousPageUrl: currentPage > 1 ?
            url.slice(0, pageNumStart) + (currentPage - 1) + url.slice(pageNumEnd) : ""
    }
};

const addPageUrlToFirstPage = (data, colName, searchTerm) => {
    const newData = {
        result: data.data,
        nextPageUrl: "users?_page=2&_limit=10&" + (colName ? colName + '_like=' + searchTerm : ''),
        previousPageUrl: ''
    };
    return newData;
};


function* searchData(action) {
    try {
        yield put({type: "CHANGE_SEARCH_TERM", payload: action.payload});
        let data = yield call(axios.get, "users?_page=1&_limit=10" +
            (action.payload ? '&' + action.payload.col.name + '_like=' + action.payload.searchTerm : ''));
        yield delay(500); // todo for emulating respond delay
        // todo required only for emulating correct api respond. Should be deleted in is done
        data = yield action.payload ?
            call(addPageUrlToFirstPage, data, action.payload.col.name, action.payload.searchTerm)
            : call(addPageUrlToFirstPage, data, '', '');

        yield put({type: "SEARCH_USERS_SUCCESS", payload: data});
    } catch (e) {
        yield put({type: "SEARCH_USERS_FAILED", message: e.message});
    }
}

function* getPage(action) {
    try {
        let data = yield call(axios.get, action.payload.url);
        yield delay(500);  // todo for emulating respond delay
        // todo required only for emulating correct api respond. Should be deleted in is done
        data = yield call(addPageUrlToAnyPage, data, action.payload.url);
        yield put({type: "SEARCH_USERS_SUCCESS", payload: data});
    } catch (e) {
        yield put({type: "GET_PAGE_FAILED", message: e.message});
    }
}


function* searchSaga() {
    yield takeLatest('SEARCH_DATA', searchData);
}

function* getPageSaga() {
    yield takeLatest('GET_USER_PAGE', getPage);
}

export default function* rootUsersSaga() {
    yield all([
        fork(searchSaga),
        fork(getPageSaga)
    ])
}