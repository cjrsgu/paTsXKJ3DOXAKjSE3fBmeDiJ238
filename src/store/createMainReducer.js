import { combineReducers } from 'redux';

import { reducer as userList } from '../ducks/users';

export default () => {
  console.log(userList);
  const reducers = {
    userList,
  };

  return combineReducers(reducers);
};
