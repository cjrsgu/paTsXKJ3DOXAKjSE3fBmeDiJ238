import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../ducks/users';

const User = ({ users, getUser }) => {
  let { id } = useParams();
  useEffect(() => { getUser(id)}, []);

  const user = users && users.find(user => user && user.id === Number(id));

  if (!user) return <div>Пользователь не найден</div>;

  return (<>
    <div>{user.biography}</div>
    <div>{user.birth_date}</div>
    <div>{user.first_name}</div>
    <div>{user.gender}</div>
    <div>{user.id}</div>
    <div>{user.is_active}</div>
    <div>{user.job}</div>
    <div>{user.last_name}</div>
  </>);
};

export default connect((state) => ({
  users: state.userList.users,
}), {getUser})(User);
