import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { uploadPostImage } from '../../api/posts';

export default function PostImageUploadPage() {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  async function handleUpload() {
    if (!file) return;
    try {
      await uploadPostImage(file, id);
      alert('Image uploaded');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Upload Image for Post {id}</h2>
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
