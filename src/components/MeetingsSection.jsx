import React from 'react';

const MeetingsSection = ({ meetings }) => {
  return (
    <div className="project-card meetings-card">
      <h2>Rendez-vous avec l'Encadrant</h2>
      {meetings.length === 0 ? (
        <p className="empty-message">Aucun rendez-vous programmé</p>
      ) : (
        <ul className="meetings-list">
          {meetings.map(meeting => (
            <li key={meeting.id} className="meeting-item">
              <div className="meeting-date">
                <span className="date">{meeting.date}</span>
                <span className="time">{meeting.time}</span>
              </div>
              <div className="meeting-details">
                <h3>{meeting.agenda}</h3>
                <p>Lieu: {meeting.location}</p>
              </div>
              <button className="nav-button small">
                Ajouter à mon calendrier
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MeetingsSection;