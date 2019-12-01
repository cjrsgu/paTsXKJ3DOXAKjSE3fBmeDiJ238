import { all, fork } from 'redux-saga/effects';

import { saga as userListSaga } from '../ducks/users';

export default function* rootSaga() {
  yield all([
    fork(userListSaga),
  ]);
}
