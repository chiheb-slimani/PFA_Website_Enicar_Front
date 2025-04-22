import React from 'react';

const AvailableSubjects = ({ subjects, onRankSelection, remainingSlots, maxChoices }) => {
  return (
    <div className="subjects-section">
      <h2>Sujets Disponibles</h2>
      {subjects.length === 0 ? (
        <p className="empty-message">Aucun sujet disponible</p>
      ) : (
        <ul className="subjects-list">
          {subjects.map(subject => (
            <li key={subject.id} className="subject-card">
              <div className="subject-content">
                <h3>{subject.title}</h3>
                <p className="description">{subject.description}</p>
                <div className="supervisor-info">
                  <span>Encadrant: {subject.supervisor}</span>
                  <span>Email: {subject.email}</span>
                </div>
                {subject.notes && <p className="notes">Notes: {subject.notes}</p>}
              </div>
              
              <div className="rank-selector">
                <select
                  onChange={(e) => onRankSelection(subject, parseInt(e.target.value))}
                  disabled={remainingSlots <= 0}
                >
                  <option value="">Choisir rang</option>
                  {[...Array(maxChoices).keys()].map(i => (
                    <option key={i+1} value={i+1}>
                      {i+1} {i === 0 ? '(Premier choix)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailableSubjects;