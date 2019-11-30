import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = ({ users }) => {
  let { id } = useParams();
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
}))(User);
