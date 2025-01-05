import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateComment } from '../../api/comments';

export default function CommentEditPage() {
  const [commentId, setCommentId] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  async function handleUpdate() {
    try {
      await updateComment({
        id: parseInt(commentId),
        description
      });
      navigate('/posts');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Edit Comment</h2>
              <div className="mb-3">
                <input
                  className="form-control mb-3"
                  placeholder="Comment ID"
                  value={commentId}
                  onChange={e => setCommentId(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Edit your comment..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows="4"
                />
              </div>
              <button className="btn btn-primary w-100" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
