import { List, Record } from 'immutable';
import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';
import { logger } from 'redux-logger/src';
// Constants
const FETCH_USER_LIST_REQUEST = 'USER_LIST/FETCH_USER_LIST_REQUEST';
const FETCH_USER_LIST_RESPONSE = 'USER_LIST/FETCH_USER_LIST_RESPONSE';
const FETCH_USER_LIST_ERROR = 'USER_LIST/FETCH_USER_LIST_ERROR';

export const ReducerRecord = Record({
  users: new List(),
  isLoading: false,
  error: false,
}, 'UserListRecord');
export function reducer(state =  new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USER_LIST_REQUEST: {
      return state.set('isLoading', true);
    }

    case FETCH_USER_LIST_RESPONSE: {
      console.log(state.error)
      return new ReducerRecord({
        users: payload.users,
      });
    }

    case FETCH_USER_LIST_ERROR: {
      return state.merge({ error: true, isLoading: true });
    }

    default: {
      return state;
    }
  }
}

// Action Creators
export function getUserList() {
  return {
    type: FETCH_USER_LIST_REQUEST,
  }
}

export function setUserList(users) {
  return {
    type: FETCH_USER_LIST_RESPONSE,
    payload: {
      users
    }
  }
}

// Saga
function* getUserListSaga() {
  try {
    const response = yield call(axios, 'http://frontend-candidate.dev.sdh.com.ua/v1/contact/');

    yield put(setUserList(response.data));
  } catch (error) {
    yield put({ type: FETCH_USER_LIST_ERROR });
    console.log(error);
  }
}

function* getUserListSagaHandler() {
  yield takeEvery(FETCH_USER_LIST_REQUEST, getUserListSaga);
}

export function* saga() {
  yield all([
    getUserListSagaHandler(),
  ]);
}

