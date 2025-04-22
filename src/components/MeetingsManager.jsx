import React from 'react';

const MeetingsManager = ({ meetings, onAdd, onEdit, onDelete }) => {
  return (
    <div className="meetings-manager">
      <div className="section-header">
        <h3>Rendez-vous</h3>
        <button onClick={onAdd} className="primary-btn small">
          Ajouter Rendez-vous
        </button>
      </div>
      
      {meetings.length === 0 ? (
        <p className="no-items">Aucun rendez-vous planifié</p>
      ) : (
        <ul className="meetings-list">
          {meetings.map(meeting => (
            <li key={meeting.id} className="meeting-item">
              <div className="meeting-info">
                <div className="meeting-date">
                  <strong>{meeting.date}</strong> à {meeting.time}
                </div>
                <div className="meeting-location">{meeting.location}</div>
                <div className="meeting-description">{meeting.description}</div>
              </div>
              <div className="meeting-actions">
                <button onClick={() => onEdit(meeting)} className="edit-btn">
                  Modifier
                </button>
                <button onClick={() => onDelete(meeting.id)} className="danger-btn">
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MeetingsManager;