import React from 'react';

const SubjectList = ({ subjects, onEdit, onDelete }) => {
  return (
    <div className="subject-list">
      <h2>Liste des Sujets Proposés</h2>
      
      {subjects.length === 0 ? (
        <p className="no-subjects">Aucun sujet proposé pour le moment</p>
      ) : (
        <ul className="subjects">
          {subjects.map(subject => (
            <li key={subject.id} className="subject-item">
              <div className="subject-content">
                <h3>{subject.title}</h3>
                <p>{subject.description}</p>
              </div>
              <div className="subject-actions">
                <button 
                  onClick={() => onEdit(subject)}
                  className="edit-btn"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => onDelete(subject.id)}
                  className="danger-btn"
                >
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

export default SubjectList;