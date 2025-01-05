import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createComment } from '../../api/comments';
import { AuthContext } from '../../context/AuthContext';

export default function CommentCreatePage() {
  const { postId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  async function handleCreate() {
    try {
      await createComment(postId, currentUser.id, { description });
      navigate(`/comments/post/${postId}`);
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
              <h2 className="card-title text-center mb-4">Create Comment</h2>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Write your comment here..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows="4"
                />
              </div>
              <button className="btn btn-primary w-100" onClick={handleCreate}>
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
