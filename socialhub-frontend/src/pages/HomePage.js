import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body text-center">
          <h1 className="card-title mb-4">Welcome to SocialHub</h1>
          {currentUser ? (
            <p className="lead">
              You are logged in as {currentUser.name}
            </p>
          ) : (
            <p className="lead">Please login or register to continue</p>
          )}
        </div>
      </div>
    </div>
  );
}

