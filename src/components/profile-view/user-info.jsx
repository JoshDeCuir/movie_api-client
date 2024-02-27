import React from "react";

function UserInfo ({ email, username }) {
  return(
    <>
      <p>User: {username}</p>
      <p>Email: {email}</p>
    </>

  )
}

export default UserInfo