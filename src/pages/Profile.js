import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data.data);
    } catch (err) {
      setError('Failed to load profile. Please try again.');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <h2>{user?.username}</h2>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <label>Username</label>
            <p>{user?.username}</p>
          </div>

          <div className="info-item">
            <label>Email</label>
            <p>{user?.email}</p>
          </div>

          <div className="info-item">
            <label>Member Since</label>
            <p>{new Date(user?.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
