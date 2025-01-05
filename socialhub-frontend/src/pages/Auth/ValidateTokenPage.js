import React, { useEffect, useState } from 'react';
import { validateToken } from '../../api/auth';

export default function ValidateTokenPage() {
  const [message, setMessage] = useState('Checking token...');

  useEffect(() => {
    validateToken()
      .then(() => setMessage('Token is valid.'))
      .catch(() => setMessage('Invalid or expired token.'));
  }, []);

  return (
    <div>
      <h2>Validate Token</h2>
      <p>{message}</p>
    </div>
  );
}
