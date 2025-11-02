import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Post.css';

const Post = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const isOwner = user && (user.id === post.user?._id || user.id === post.user || user._id === post.user?._id || user._id === post.user);

  const handleLike = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await api.post(`/posts/${post._id}/like`);
      if (onUpdate) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    setLoading(true);
    try {
      const response = await api.post(`/posts/${post._id}/comment`, {
        text: commentText,
      });
      setCommentText('');
      if (onUpdate) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editText.trim()) return;
    setLoading(true);
    try {
      const response = await api.put(`/posts/${post._id}`, {
        text: editText,
      });
      setIsEditing(false);
      if (onUpdate) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error editing post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    try {
      await api.delete(`/posts/${post._id}`);
      if (onUpdate) {
        onUpdate(null);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const isLiked = user && post.likes?.some(like => {
    const userId = user.id || user._id;
    if (typeof like === 'object') return like._id === userId || like === userId;
    return like === userId || like.toString() === userId?.toString();
  });

  const userName = post.user?.name || 'Unknown User';
  const userEmail = post.user?.email || '';

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="author-name">{userName}</div>
            <div className="post-time">{formatDate(post.createdAt)}</div>
          </div>
        </div>
        {isOwner && (
          <div className="post-actions">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="edit-button"
              title="Edit post"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="delete-button"
              title="Delete post"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="edit-form">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={3}
          />
          <div className="edit-actions">
            <button onClick={handleEdit} disabled={loading} className="save-button">
              Save
            </button>
            <button onClick={() => {
              setIsEditing(false);
              setEditText(post.text);
            }} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="post-content">{post.text || ''}</div>
          {post.image && (
            <div className="post-image">
              <img src={`http://localhost:5000/${post.image}`} alt="Post" />
            </div>
          )}
        </>
      )}

      <div className="post-footer">
        <button
          onClick={handleLike}
          disabled={loading || !user}
          className={`like-button ${isLiked ? 'liked' : ''}`}
        >
          {isLiked ? '❤️' : '🤍'} Like ({post.likes?.length || 0})
        </button>
      </div>

      {post.comments && post.comments.length > 0 && (
        <div className="comments-section">
          <h4>Comments:</h4>
          {post.comments.map((comment, idx) => {
            const commentUser = comment.user?.name || 'Unknown';
            return (
              <div key={idx} className="comment">
                <strong>{commentUser}:</strong> {comment.text}
              </div>
            );
          })}
        </div>
      )}

      {user && (
        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !commentText.trim()}>
            Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
