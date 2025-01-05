import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { uploadGroupCover } from '../../api/groups';

export default function GroupCoverUploadPage() {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  async function handleUpload() {
    if (!file) return;
    try {
      await uploadGroupCover(file, id);
      alert('Cover uploaded');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card">
      <h2>Group Cover Upload</h2>
      <input
        type="file"
        className="form-control mb-3"
        onChange={e => setFile(e.target.files[0])}
      />
      <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
    </div>
  );
}
