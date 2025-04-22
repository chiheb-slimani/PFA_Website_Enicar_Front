import React from 'react';

const ProjectDetails = ({ project }) => {
  // Safely handle undefined project
  if (!project) {
    return (
      <div className="project-details">
        <p>Les détails du projet ne sont pas disponibles</p>
      </div>
    );
  }

  // Destructure with default values
  const {
    title = "Titre non disponible",
    description = "Description non disponible",
    status = "Statut inconnu",
    supervisor = "Encadrant non spécifié",
    supervisorEmail = "",
    startDate = "Date non définie",
    endDate = "Date non définie",
    binomes = []
  } = project;

  // Safely format status for className
  const statusClass = typeof status === 'string' 
    ? status.toLowerCase().replace(/\s+/g, '-')
    : 'statut-inconnu';

  return (
    <div className="project-details">
      <div className="project-header">
        <h2>{title}</h2>
        <div className="project-status">
          <span className={`status-badge ${statusClass}`}>
            {status}
          </span>
        </div>
      </div>
      
      <p className="project-description">{description}</p>
      
      <div className="project-meta">
        <div className="meta-item">
          <span className="meta-label">Encadrant:</span>
          <span className="meta-value">
            {supervisor} 
            {supervisorEmail && ` (${supervisorEmail})`}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Période:</span>
          <span className="meta-value">
            {startDate} au {endDate}
          </span>
        </div>
      </div>
      
      <div className="binomes-section">
        <h3>Binômes assignés</h3>
        {binomes.length > 0 ? (
          <ul className="binomes-list">
            {binomes.map((binome, index) => {
              // Safely handle binome data
              const prenom = binome?.prenom || "Prénom";
              const nom = binome?.nom || "Nom";
              const email = binome?.email || "Email non disponible";
              
              return (
                <li key={index} className="binome-item">
                  <div className="binome-info">
                    <span className="binome-name">{prenom} {nom}</span>
                    <span className="binome-email">{email}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="empty-message">Aucun binôme assigné</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;