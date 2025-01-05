import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPost, deletePost } from '../../api/posts';

export default function PostDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id)
      .then(data => setPost(data))
      .catch(err => console.error(err));
  }, [id]);

  async function handleDelete() {
    try {
      await deletePost(id);
      navigate('/posts');
    } catch (err) {
      console.error(err);
    }
  }

  if (!post) return <div className="card">Loading post...</div>;

  return (
    <div className="card">
      <h2>Post Details</h2>
      <div className="mb-3">
        <strong>ID:</strong> {post.id}
      </div>
      <div className="mb-3">
        <strong>Description:</strong>
        <p>{post.description}</p>
      </div>
      <div className="btn-group mb-3">
        <Link to={`/posts/${post.id}/edit`} className="btn btn-primary">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
      <div className="mb-3">
        {/* <Link to={`/posts/${post.id}/image`} className="btn btn-link">Upload Image</Link> */}
        <Link to={`/comments/post/${post.id}`} className="btn btn-link">View Comments</Link>
      </div>
    </div>
  );
}
