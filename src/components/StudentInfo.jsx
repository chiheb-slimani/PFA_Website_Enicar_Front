import React from 'react';

const StudentInfo = ({ nom, prenom, mail, moyenne, moyenneTotale }) => {
  return (
    <div className="student-info">
      <h2>Mes Informations</h2>
      <div className="info-grid">
        <div className="info-label">Nom:</div>
        <div className="info-value">{nom}</div>
        
        <div className="info-label">Prénom:</div>
        <div className="info-value">{prenom}</div>
        
        <div className="info-label">Email:</div>
        <div className="info-value">{mail}</div>
        
        <div className="info-label">Ma Moyenne:</div>
        <div className="info-value">{moyenne}/20</div>
        
     
      </div>
    </div>
  );
};

export default StudentInfo;