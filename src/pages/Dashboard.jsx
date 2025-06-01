import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import api from '../services/api';
import UrlCard from '../components/dashboard/UrlCard';
import AddUrlModal from '../components/dashboard/AddUrlModal';
import './Dashboard.css';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await api.getAllUrls();
      setUrls(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching URLs:', err);
      setError('Failed to load URLs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUrls();
    setTimeout(() => setRefreshing(false), 1000); // Show refresh animation for at least 1 second
  };

  const handleAddUrl = async (urlData) => {
    try {
      await api.addUrl(urlData);
      setShowAddModal(false);
      fetchUrls();
    } catch (err) {
      console.error('Error adding URL:', err);
      return { error: 'Failed to add URL. Please try again.' };
    }
  };

  const handleDeleteUrl = async (id) => {
    try {
      await api.deleteUrl(id);
      setUrls(urls.filter(url => url.id !== id));
    } catch (err) {
      console.error('Error deleting URL:', err);
      setError('Failed to delete URL. Please try again.');
    }
  };

  const handlePauseUrl = async (id) => {
    try {
      await api.pauseUrl(id);
      setUrls(urls.map(url => 
        url.id === id ? { ...url, active: false } : url
      ));
    } catch (err) {
      console.error('Error pausing URL:', err);
      setError('Failed to pause URL. Please try again.');
    }
  };

  const handleRetryUrl = async (id) => {
    try {
      await api.retryUrl(id);
      setUrls(urls.map(url => 
        url.id === id ? { ...url, active: true } : url
      ));
    } catch (err) {
      console.error('Error reactivating URL:', err);
      setError('Failed to reactivate URL. Please try again.');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Your Monitored URLs</h1>
          <div className="dashboard-actions">
            <button 
              className={`btn btn-secondary refresh-btn ${refreshing ? 'refreshing' : ''}`}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button 
              className="btn btn-primary add-url-btn"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={16} />
              <span>Add URL</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="url-cards-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your URLs...</p>
            </div>
          ) : urls.length === 0 ? (
            <div className="empty-state">
              <h3>No URLs being monitored yet</h3>
              <p>Add your first URL to start monitoring its uptime.</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={16} />
                <span>Add Your First URL</span>
              </button>
            </div>
          ) : (
            urls.map(url => (
              <UrlCard 
                key={url.id}
                url={url}
                onDelete={handleDeleteUrl}
                onPause={handlePauseUrl}
                onRetry={handleRetryUrl}
              />
            ))
          )}
        </div>
      </div>

      <AddUrlModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddUrl}
      />
    </div>
  );
};

export default Dashboard;