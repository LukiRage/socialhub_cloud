import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getComment, deleteComment } from '../../api/comments';

export default function CommentDetailsPage() {
  const { id } = useParams();
  const [comment, setComment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getComment(id)
      .then(data => setComment(data))
      .catch(err => console.error(err));
  }, [id]);

  async function handleDelete() {
    try {
      await deleteComment(id);
      navigate('/posts');
    } catch (err) {
      console.error(err);
    }
  }

  if (!comment) return (
    <div className="container mt-4 text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading comment...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Comment Details</h2>
          <p className="card-text lead mb-4">{comment.description}</p>
          <div className="d-flex gap-2">
            <Link to={`/comments/${comment.id}/edit`} className="btn btn-outline-primary">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
