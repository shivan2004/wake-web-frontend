import React, { useState } from 'react';
import Modal from '../common/Modal';
import { AlertCircle } from 'lucide-react';
import './AddUrlModal.css';

const AddUrlModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!title.trim()) {
      setError('Please enter a title for your URL');
      return;
    }
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    try {
      setLoading(true);
      const result = await onAdd({ title, url });
      if (result && result.error) {
        setError(result.error);
      } else {
        handleClose();
      }
    } catch (err) {
      console.error('Error adding URL:', err);
      setError('Failed to add URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const modalFooter = (
    <>
      <button
        className="btn btn-secondary"
        onClick={handleClose}
        disabled={loading}
      >
        Cancel
      </button>
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add URL'}
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New URL to Monitor"
      footer={modalFooter}
    >
      <div className="add-url-form">
        {error && (
          <div className="form-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="form-info">
          <AlertCircle size={16} />
          <p>
            The server must return a <strong>200 OK</strong> status code to be considered active.
            Any other status code will cause the monitoring to stop.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My API Server"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url" className="form-label">URL</label>
          <input
            type="text"
            id="url"
            className="form-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={loading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddUrlModal;