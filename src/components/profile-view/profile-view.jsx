import React, { useState, useEffect } from 'react';
import UserInfo from './user-info';

const ProfileView = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('users');
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {loading && <p>loading...</p>}
      {userData && (
        <div>
          <h2>{userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Birthday: {userData.birthday}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileView;