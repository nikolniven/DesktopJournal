import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function EntriesPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return navigate('/login');
  }

  return (
    <div>
      <h1>Your Journal Entries</h1>
      {user && <p>Welcome, {user.name}</p>}
    </div>
  );
}

export default EntriesPage;
