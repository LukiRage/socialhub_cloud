import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { uploadProfilePicture } from '../../api/users';

export default function UserProfilePicturePage() {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  async function handleUpload() {
    if (!file) return;
    try {
      await uploadProfilePicture(file, id);
      alert('Profile picture uploaded');
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  }

  return (
    <div>
      <h2>Upload Profile Picture</h2>
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
