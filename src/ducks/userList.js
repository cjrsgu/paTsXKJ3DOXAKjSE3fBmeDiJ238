import { List, Record } from 'immutable';
import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
// Constants
const FETCH_USER_LIST_REQUEST = 'USER_LIST/FETCH_USER_LIST_REQUEST';
const FETCH_USER_LIST_RESPONSE = 'USER_LIST/FETCH_USER_LIST_RESPONSE';

export const ReducerRecord = Record({
  userList: new List(),
  isLoading: false,
  isLoaded: false,
}, 'UserListRecord');
export function reducer(state =  new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USER_LIST_REQUEST: {
      return state.set('isLoading', true);
    }

    case FETCH_USER_LIST_RESPONSE: {
      return state.set('isLoading', false);
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

// Saga
function* getUserListSaga() {
  return true;
}

function* getUserListSagaHandler() {
  yield takeLatest(FETCH_USER_LIST_REQUEST, getUserListSaga);
}

export function* saga() {
  yield all([
    getUserListSagaHandler(),
  ]);
}

