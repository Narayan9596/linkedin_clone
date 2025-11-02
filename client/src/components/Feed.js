import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import PostForm from './PostForm';
import Post from './Post';
import './Feed.css';

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdate = (updatedPost) => {
    if (updatedPost === null) {
      // Post was deleted
      fetchPosts();
    } else {
      setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p));
    }
  };

  if (loading) {
    return <div className="feed-loading">Loading posts...</div>;
  }

  return (
    <div className="feed-container">
      {user && <PostForm onPostCreated={handlePostCreated} />}
      
      {error && <div className="error-message">{error}</div>}
      
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts yet. Be the first to post something!</p>
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
  );
};

export default Feed;
