import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById, deleteUser } from '../../api/users';
import { followUser, unfollowUser, getUserFollowings } from '../../api/followings';

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const { currentUser, logout } = useContext(AuthContext);

  useEffect(() => {
    getUserById(id)
      .then(data => setUser(data))
      .catch(err => console.error(err));
    if (currentUser) {
      getUserFollowings(currentUser.id)
        .then(followings => {
          setIsFollowing(followings.some(f => f.followed_user.id === parseInt(id)));
        })
        .catch(err => console.error(err));
    }
  }, [id, currentUser]);

  async function handleDelete() {
    try {
      await deleteUser(id);
      logout();
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error deleting user');
    }
  }

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(currentUser.id, id);
        setIsFollowing(false);
      } else {
        await followUser(currentUser.id, id);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating follow status');
    }
  };

  if (!user) {
    return <div className="card">Loading user...</div>;
  }

  return (
    <div className="card">
      <h2>User Details</h2>
      <div className="mb-3">
        <strong>ID:</strong> {user.id}
      </div>
      <div className="mb-3">
        <strong>Name:</strong> {user.name}
      </div>
      <div className="mb-3">
        <strong>E-mail:</strong> {user.email}
      </div>
      <div className="mb-3">
        <strong>Description:</strong> {user.description}
      </div>
      
      <div className="btn-group mb-3">
        <Link to={`/users/${user.id}/edit`} className="btn btn-primary">Edit</Link>
        {currentUser && currentUser.id !== parseInt(id) && (
          <button className="btn btn-outline-primary" onClick={handleFollowToggle}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>

      <div className="mb-3">
        <Link to={`/follow/${id}/following`} className="btn btn-link">View Following</Link>
        <Link to={`/follow/${id}/followers`} className="btn btn-link">View Followers</Link>
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
}
