import { List, Record } from 'immutable';
import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';

// Constants
const FETCH_USER_LIST_REQUEST = 'USERS/FETCH_USER_LIST_REQUEST';
const FETCH_USER_LIST_RESPONSE = 'USERS/FETCH_USER_LIST_RESPONSE';

const FETCH_USER_RESPONSE = 'USERS/FETCH_USER_RESPONSE';
const FETCH_USER_REQUEST = 'USERS/FETCH_USER_REQUEST';

const DELETE_USER_RESPONSE = 'USERS/DELETE_USER_RESPONSE';
const DELETE_USER_REQUEST = 'USERS/DELETE_USER_REQUEST';

const UPDATE_USER_RESPONSE = 'USERS/UPDATE_USER_RESPONSE';
const UPDATE_USER_REQUEST = 'USERS/UPDATE_USER_REQUEST';

const ADD_USER_RESPONSE = 'USERS/ADD_USER_RESPONSE';
const ADD_USER_REQUEST = 'USERS/ADD_USER_REQUEST';

const SET_ERROR = 'USERS/SET_ERROR';
const CLEAR_ERROR = 'USERS/CLEAR_ERROR';

// Records
export const UserRecord = Record({
  id: null,
  first_name: null,
  last_name: null,
  birth_date: null,
  gender: null,
  job: null,
  biography: null,
  is_active: false,
}, 'UserRecord');
export const ReducerRecord = Record({
  users: new List(),
  isFetching: false,
  isActualizing: false,
  isUpdating: false,
  isDeleting: false,
  error: false,
}, 'UserListRecord');

// Reducer
export function reducer(state =  new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USER_LIST_REQUEST: {
      return state.set('isFetching', true);
    }

    case FETCH_USER_LIST_RESPONSE: {
      return new ReducerRecord({
        users: new List(payload.users.map(user => new UserRecord(user))),
      });
    }

    case FETCH_USER_REQUEST: {
      return state.set('isActualizing', true);
    }

    case FETCH_USER_RESPONSE: {
      const userIndex = state.users.findIndex((user) => user.id === payload.user.id);

      if (userIndex !== -1) {
        return state
          .set('isActualizing', false)
          .update('users', (users) => users.set(userIndex, new UserRecord(payload.user)));
      }

      return state
        .set('isActualizing', false)
        .update('users', (user) => user.push(new UserRecord(payload.user)));
    }

    case DELETE_USER_REQUEST: {
      return state.set('isDeleting', true);
    }

    case DELETE_USER_RESPONSE: {
      const userIndex = state.users.findIndex((user) => user.id === payload.user.id);
      if (userIndex !== 1)
        return state
          .set('isDeleting', false)
          .update('users', (user) => user.delete(userIndex));

      return state;
    }

    case SET_ERROR: {
      return state.merge({
        error: true,
        isLoading: false,
        isActualizing: false,
        isDeleting: false,
      });
    }

    case CLEAR_ERROR: {
      return state.set('error', false);
    }

    case UPDATE_USER_REQUEST: {
      return state.set('isUpdating', true);
    }

    case UPDATE_USER_RESPONSE: {
      const userIndex = state.users.findIndex((user) => user.id === Number(payload.user.id));

      if (userIndex !== -1) {
        return state
          .set('isUpdating', false)
          .update('users', (users) => users.set(userIndex, new UserRecord(payload.user)));
      }

      return state
        .set('isUpdating', false)
        .update('users', (user) => user.push(new UserRecord(payload.user)));
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

export function getUser(id) {
  return {
    type: FETCH_USER_REQUEST,
    payload: {
      id
    }
  }
}

export function deleteUser(id) {
  return {
    type: DELETE_USER_REQUEST,
    payload: {
      id,
    }
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER_REQUEST,
    payload: {
      user,
    }
  }
}

export function addUser(user) {
  return {
    type: ADD_USER_REQUEST,
    payload: {
      user,
    }
  }
}

// ======
function setUserList(users) {
  return {
    type: FETCH_USER_LIST_RESPONSE,
    payload: {
      users
    }
  }
}

function setUser(user) {
  return {
    type: FETCH_USER_RESPONSE,
    payload: {
      user
    }
  }
}

// Saga
function* addUserSaga(action) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: `http://localhost:3002/v1/contact/`,
      data: {
        ...action.payload.user,
      },
    });

    console.log(response.data);
    yield put({
      type: ADD_USER_RESPONSE,
      payload: {
        user: response.data,
      }
    });
  } catch (error) {
    console.log(error);
    yield put({ type: SET_ERROR });
  }
}

function* addUserSagaHandler() {
  yield takeEvery(ADD_USER_REQUEST, addUserSaga);
}

function* updateUserSaga(action) {
  try {
    const response = yield call(axios, {
      method: 'put',
      url: `http://localhost:3002/v1/contact/${action.payload.user.id}`,
      data: {
        ...action.payload.user,
      },
    });

    console.log(response.data);
    yield put({
      type: UPDATE_USER_RESPONSE,
      payload: {
        user: response.data,
      }
    });
  } catch (error) {
    console.log(error);
    yield put({ type: SET_ERROR });
  }
}

function* updateUserSagaHandler() {
  yield takeEvery(UPDATE_USER_REQUEST, updateUserSaga);
}

function* deleteUserSaga(action) {
  try {
    const response = yield call(axios, {
      method: 'delete',
      url: `http://localhost:3002/v1/contact/${action.payload.id}`,
    });

    console.log(response.data);
    yield put({
      type: DELETE_USER_RESPONSE,
      payload: {
        user: response.data,
      }
    });
  } catch (error) {
    console.log(error);
    yield put({ type: SET_ERROR });
  }
}

function* deleteUserSagaHandler() {
  yield takeEvery(DELETE_USER_REQUEST, deleteUserSaga);
}

function* getUserSaga(action) {
  try {
    console.log('here');
    const response = yield call(axios, {
      method: 'get',
      url: `http://localhost:3002/v1/contact/${action.payload.id}`,
    });


    console.log(response.data);
    yield put(setUser(response.data));
  } catch (error) {
    console.log(error);
    yield put({ type: SET_ERROR });
  }
}

function* getUserSagaHandler() {
  yield takeEvery(FETCH_USER_REQUEST, getUserSaga);
}

function* getUserListSaga() {
  try {
    console.log('here');
    const response = yield call(axios, {
      method: 'get',
      url: 'http://localhost:3002/v1/contact/',
    });
    console.log(response);
    yield put(setUserList(response.data));
  } catch (error) {
    console.log(error);
    yield put({ type: SET_ERROR });
  }
}

function* getUserListSagaHandler() {
  yield takeEvery(FETCH_USER_LIST_REQUEST, getUserListSaga);
}

export function* saga() {
  yield all([
    getUserListSagaHandler(),
    getUserSagaHandler(),
    deleteUserSagaHandler(),
    updateUserSagaHandler(),
    addUserSagaHandler(),
  ]);
}

