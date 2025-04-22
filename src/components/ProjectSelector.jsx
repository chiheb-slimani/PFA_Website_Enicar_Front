import React from 'react';

const ProjectSelector = ({ projects, selectedProjectId, onSelectProject }) => {
  return (
    <div className="project-selector">
      <h2>Mes Projets</h2>
      <div className="project-list">
        {projects.map(project => (
          <div 
            key={project.id}
            className={`project-card ${project.id === selectedProjectId ? 'selected' : ''}`}
            onClick={() => onSelectProject(project.id)}
          >
            <h3>{project.title}</h3>
            <div className="project-meta">
              <span>{project.binomes.length} binôme(s)</span>
              <span>{project.meetings.length} rendez-vous</span>
              <span>{project.tasks.length} tâche(s)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSelector;