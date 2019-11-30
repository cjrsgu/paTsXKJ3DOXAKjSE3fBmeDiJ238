import React from 'react';
import { connect } from 'react-redux';
import { Link, } from 'react-router-dom';
import { getUserList } from '../ducks/userList';
import User from '../features/User';

const UserList = ({ getUserList, users }) => {
  // console.log(users);
  if (users.size ===0)
  getUserList();
  return (
    <>
    <div>UserList</div>
      {users.map(user => (
<React.Fragment key={user.id}>
  <Link to={`/user/${user.id}`}>{user.first_name}</Link>
        <User userData={user} />
        <div>----------------------------------</div>
  </React.Fragment>
      ))}
      </>
  )
}

export default connect((state) => ({
  users: state.userList.users,
}), ({getUserList}))(UserList);
