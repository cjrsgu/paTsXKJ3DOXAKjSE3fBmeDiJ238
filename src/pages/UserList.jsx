import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserList, deleteUser } from '../ducks/users';
import User from '../features/User';

const UserList = ({ getUserList, users, deleteUser }) => {
  // console.log(users);
  useEffect(() => { getUserList()}, []);

  return (
    <>
      <div>UserList</div>
      {users.map(user => (
        <React.Fragment key={user.id}>
          <Link to={`/user/${user.id}`}>{user.first_name}</Link>
          <div>====================================</div>
          <Link to={`/add-user/${user.id}`}>edit</Link>
          <User userData={user} />
          <div onClick={() => deleteUser(user.id)}>delete</div>
          <div>----------------------------------</div>
        </React.Fragment>
      ))}
    </>
  );
};

export default connect((state) => ({
  users: state.userList.users,
}), ({ getUserList, deleteUser }))(UserList);
