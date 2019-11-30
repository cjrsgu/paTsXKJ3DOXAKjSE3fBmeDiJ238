import { combineReducers } from 'redux';

import { reducer as userList } from '../ducks/userList';

export default () => {
  console.log(userList);
  const reducers = {
    userList,
  };

  return combineReducers(reducers);
};
