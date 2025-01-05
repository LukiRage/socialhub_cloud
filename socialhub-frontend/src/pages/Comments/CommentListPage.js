// CommentListPage.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getAllCommentsForPost, deleteComment } from '../../api/comments';
import { AuthContext } from '../../context/AuthContext';

export default function CommentListPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getAllCommentsForPost(postId)
      .then(data => setComments(data))
      .catch(err => console.error(err));
  }, [postId]);

  async function handleDelete(comment) {
    try{
      await deleteComment(comment);
      navigate(`/posts/${postId}`);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Comments for Post {postId}</h2>
          <Link className="btn btn-primary mb-3" to={`/comments/create/${postId}/${currentUser.id}`}>
            Add Comment
          </Link>
          <div className="list-group">
            {comments.map(c => (
              <div key={c.id} className="list-group-item list-group-item-action mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="mb-1">{c.description}</strong>
                    <p className="text-muted mb-1">Author: {c.user?.name}</p>
                  </div>
                  {currentUser && c.user && currentUser.id === c.user.id && (
                    <div className="btn-group">
                      <Link className="btn btn-outline-primary btn-sm" to={`/comments/${c.id}/edit`}>Edit</Link>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
