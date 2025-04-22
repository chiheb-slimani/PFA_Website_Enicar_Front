import React, { useRef } from 'react';

const TasksSection = ({ tasks, onFileUpload }) => {
  const fileInputRefs = useRef({});

  const handleUploadClick = (taskId) => {
    fileInputRefs.current[taskId]?.click();
  };

  const handleFileChange = (taskId, e) => {
    if (e.target.files.length > 0) {
      onFileUpload(taskId, e.target.files[0]);
    }
  };

  return (
    <div className="project-card tasks-card">
      <h2>Tâches à Accomplir</h2>
      {tasks.length === 0 ? (
        <p className="empty-message">Aucune tâche assignée pour le moment</p>
      ) : (
        <ul className="tasks-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.status.toLowerCase().replace(' ', '-')}`}>
              <div className="task-info">
                <h3>{task.name}</h3>
                <p>Date limite: {task.deadline}</p>
                <p>Statut: <span className="status">{task.status}</span></p>
                {task.file && <p>Fichier: {task.file}</p>}
              </div>
              <div className="task-actions">
                <input
                  type="file"
                  ref={el => fileInputRefs.current[task.id] = el}
                  onChange={(e) => handleFileChange(task.id, e)}
                  style={{ display: 'none' }}
                />
                <button 
                  className="nav-button small"
                  onClick={() => handleUploadClick(task.id)}
                >
                  {task.file ? 'Remplacer' : 'Uploader'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksSection;