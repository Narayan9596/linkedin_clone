import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Post from './Post';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/users/${id}`);
      setProfileUser(response.data.user);
      setPosts(response.data.posts);
      setError('');
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePostUpdate = (updatedPost) => {
    if (updatedPost === null) {
      fetchProfile();
    } else {
      setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p));
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (error || !profileUser) {
    return <div className="error-message">{error || 'User not found'}</div>;
  }

  const isOwnProfile = currentUser && (currentUser.id === profileUser._id || currentUser._id === profileUser._id);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {profileUser.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{profileUser.name}</h1>
          <p className="profile-email">{profileUser.email}</p>
          <p className="profile-joined">
            Joined {new Date(profileUser.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="profile-posts">
        <h2>{isOwnProfile ? 'Your Posts' : 'Posts'}</h2>
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet.</p>
          </div>
        ) : (
          <div className="posts-list">
            {posts.map(post => (
              <Post
                key={post._id}
                post={post}
                onUpdate={handlePostUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
