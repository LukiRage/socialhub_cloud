import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ValidateTokenPage from './pages/Auth/ValidateTokenPage';
import UsersListPage from './pages/Users/UsersListPage';
import UserCreatePage from './pages/Users/UserCreatePage';
import UserDetailsPage from './pages/Users/UserDetailsPage';
import UserEditPage from './pages/Users/UserEditPage';
import UserProfilePicturePage from './pages/Users/UserProfilePicturePage';
import FollowListPage from './pages/Follow/FollowListPage';
import FollowManagePage from './pages/Follow/FollowManagePage';
import GroupListPage from './pages/Groups/GroupListPage';
import GroupDetailsPage from './pages/Groups/GroupDetailsPage';
import GroupCreatePage from './pages/Groups/GroupCreatePage';
import GroupEditPage from './pages/Groups/GroupEditPage';
import GroupCoverUploadPage from './pages/Groups/GroupCoverUploadPage';
import AddUserToGroupPage from './pages/Groups/AddUserToGroupPage';
import PostListPage from './pages/Posts/PostListPage';
import PostDetailsPage from './pages/Posts/PostDetailsPage';
import PostCreatePage from './pages/Posts/PostCreatePage';
import PostEditPage from './pages/Posts/PostEditPage';
import PostImageUploadPage from './pages/Posts/PostImageUploadPage';
import CommentListPage from './pages/Comments/CommentListPage';
import CommentDetailsPage from './pages/Comments/CommentDetailsPage';
import CommentCreatePage from './pages/Comments/CommentCreatePage';
import CommentEditPage from './pages/Comments/CommentEditPage';
import NavBar from './components/NavBar';

function App() {
  useEffect(() => {
    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
    bootstrapScript.integrity = 'sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p';
    bootstrapScript.crossOrigin = 'anonymous';
    document.body.appendChild(bootstrapScript);

    return () => {
      document.body.removeChild(bootstrapScript);
    };
  }, []);

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div className="app-container">
        <Router>
          <NavBar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/validate" element={<ValidateTokenPage />} />
              
              <Route path="/users" element={<UsersListPage />} />
              <Route path="/users/create" element={<UserCreatePage />} />
              <Route path="/users/:id" element={<UserDetailsPage />} />
              <Route path="/users/:id/edit" element={<UserEditPage />} />
              <Route path="/users/:id/profile-picture" element={<UserProfilePicturePage />} />

              <Route path="/follow/:userId" element={<FollowListPage />} />
              <Route path="/follow/:userId/:type" element={<FollowListPage />} />
              <Route path="/follow/manage/:followerId/:followedId" element={<FollowManagePage />} />

              <Route path="/groups" element={<GroupListPage />} />
              <Route path="/groups/create" element={<GroupCreatePage />} />
              <Route path="/groups/:id" element={<GroupDetailsPage />} />
              <Route path="/groups/:id/edit" element={<GroupEditPage />} />
              <Route path="/groups/:id/cover" element={<GroupCoverUploadPage />} />
              <Route path="/groups/:id/add-user/:userId" element={<AddUserToGroupPage />} />

              <Route path="/posts" element={<PostListPage />} />
              <Route path="/posts/create/:userId" element={<PostCreatePage />} />
              <Route path="/posts/:id" element={<PostDetailsPage />} />
              <Route path="/posts/:id/edit" element={<PostEditPage />} />
              <Route path="/posts/:id/image" element={<PostImageUploadPage />} />

              <Route path="/comments/post/:postId" element={<CommentListPage />} />
              <Route path="/comments/:id" element={<CommentDetailsPage />} />
              <Route path="/comments/create/:postId/:userId" element={<CommentCreatePage />} />
              <Route path="/comments/:id/edit" element={<CommentEditPage />} />

            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
