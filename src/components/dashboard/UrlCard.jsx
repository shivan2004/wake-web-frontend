import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, Trash2, PauseCircle, PlayCircle } from 'lucide-react';
import { formatRelativeTime, formatLocalTime } from '../../utils/dateUtils';
import './UrlCard.css';

const UrlCard = ({ url, onDelete, onPause, onRetry }) => {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(url.id);
    } else {
      setConfirmDelete(true);
      // Auto-reset after 3 seconds
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  // Get the most recent ping log
  const latestPing = url.pingLogs && url.pingLogs.length > 0 
    ? url.pingLogs[0] 
    : null;

  const isActive = url.active;
  const statusClass = isActive ? 'status-active' : 'status-inactive';
  const statusText = isActive ? 'Active' : 'Inactive';

  return (
    <div className={`url-card ${expanded ? 'expanded' : ''}`}>
      <div className="url-card-header">
        <div className="url-info">
          <h3 className="url-title">{url.title}</h3>
          <p className="url-address">{url.url}</p>
        </div>
        <div className="url-status">
          <span className={`status-indicator ${statusClass}`}></span>
          <span className="status-text">{statusText}</span>
        </div>
      </div>

      <div className="url-card-content">
        <div className="last-ping">
          <Clock size={16} />
          <span>
            {latestPing 
              ? `Last ping: ${formatRelativeTime(latestPing.timeStamp)}`
              : 'No pings recorded yet'}
          </span>
        </div>

        <div className="url-actions">
          {isActive ? (
            <button 
              className="action-btn pause-btn" 
              onClick={() => onPause(url.id)}
              title="Pause monitoring"
            >
              <PauseCircle size={20} />
            </button>
          ) : (
            <button 
              className="action-btn retry-btn" 
              onClick={() => onRetry(url.id)}
              title="Resume monitoring"
            >
              <PlayCircle size={20} />
            </button>
          )}
          <button 
            className={`action-btn delete-btn ${confirmDelete ? 'confirm-delete' : ''}`} 
            onClick={handleDelete}
            title={confirmDelete ? 'Click again to confirm' : 'Delete URL'}
          >
            <Trash2 size={20} />
          </button>
          <button 
            className="action-btn expand-btn" 
            onClick={toggleExpanded}
            title={expanded ? 'Collapse details' : 'Expand details'}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="url-details">
          <h4>Ping History</h4>
          {url.pingLogs && url.pingLogs.length > 0 ? (
            <div className="ping-logs">
              {url.pingLogs.map(log => (
                <div key={log.id} className="ping-log">
                  <div className={`ping-status ${log.pingStatus.toLowerCase()}`}>
                    {log.pingStatus}
                  </div>
                  <div className="ping-time">
                    {formatLocalTime(log.timeStamp)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-logs">No ping history available yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UrlCard;