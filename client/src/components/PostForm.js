import React, { useState } from 'react';
import api from '../utils/api';
import './PostForm.css';

const PostForm = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!text.trim()) {
      setError('Post text cannot be empty');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setText('');
      setImage(null);
      document.getElementById('image-input').value = '';
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          required
        />
        <div className="post-form-actions">
          <label className="image-upload-label">
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <span className="image-upload-button">📷 Add Image</span>
          </label>
          {image && (
            <span className="image-selected">{image.name}</span>
          )}
          <button type="submit" disabled={loading} className="post-button">
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
