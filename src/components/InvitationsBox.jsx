import React from 'react';

const InvitationsBox = ({ invitations, onRespond }) => {
  return (
    <div className="invitations-box">
      <h2>Invitations Reçues</h2>
      
      {invitations.length === 0 ? (
        <p className="no-invitations">Aucune invitation en attente</p>
      ) : (
        <ul className="invitations-list">
          {invitations.map(invitation => (
            <li key={invitation.id} className="invitation-item">
              <div className="invitation-details">
                <div className="invitation-from">{invitation.fromName}</div>
                <div className="invitation-email">{invitation.from}</div>
                <div className="invitation-moyenne">Moyenne: {invitation.moyenne}/20</div>
                <div className="invitation-date">Reçue le: {invitation.date}</div>
              </div>
              <div className="invitation-actions">
                <button 
                  onClick={() => onRespond(invitation.id, true)}
                  className="success-btn"
                >
                  Accepter
                </button>
                <button 
                  onClick={() => onRespond(invitation.id, false)}
                  className="danger-btn"
                >
                  Refuser
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvitationsBox;