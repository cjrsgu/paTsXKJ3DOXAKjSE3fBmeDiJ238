import React from 'react';

export default ({userData: {
  biography,
  birth_date,
  first_name,
  gender,
  id,
  is_active,
  job,
  last_name,
}}) => {
  return (
    <>
      <div>{biography}</div>
      <div>{birth_date}</div>
      <div>{first_name}</div>
      <div>{gender}</div>
      <div>{id}</div>
      <div>{is_active}</div>
      <div>{job}</div>
      <div>{last_name}</div>
    </>
  );
}
