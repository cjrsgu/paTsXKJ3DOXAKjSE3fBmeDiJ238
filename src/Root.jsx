import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

import UserList from './pages/UserList';
import User from './pages/User';
import AddUser from './pages/AddUser';

const { store } = configureStore();
console.log(store);
const Header = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/user">User</Link>
    </li>
    <li>
      <Link to="/add-user">Add User</Link>
    </li>
  </ul>
);

export default () => (
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <UserList />
          </Route>
          <Route exact path="/user/:id" children={<User />}>
          </Route>
          <Route exact path="/add-user">
            <AddUser />
          </Route>
        </Switch>
      </div>
    </Router>
  </Provider>
)
