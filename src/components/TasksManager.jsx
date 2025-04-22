import React from 'react';

const TasksManager = ({ tasks, onAdd, onEdit, onDelete }) => {
  return (
    <div className="tasks-manager">
      <div className="section-header">
        <h3>Tâches</h3>
        <button onClick={onAdd} className="primary-btn small">
          Ajouter Tâche
        </button>
      </div>
      
      {tasks.length === 0 ? (
        <p className="no-items">Aucune tâche assignée</p>
      ) : (
        <ul className="tasks-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <div className="task-info">
                <div className="task-header">
                  <h4>{task.title}</h4>
                  <span className={`status-badge ${task.status}`}>
                    {task.status === 'completed' ? 'Terminé' : 'En cours'}
                  </span>
                </div>
                <p className="task-description">{task.description}</p>
                <div className="task-deadline">
                  <strong>Échéance:</strong> {task.deadline}
                </div>
                {task.attachments.length > 0 && (
                  <div className="task-attachments">
                    <strong>Fichiers:</strong>
                    <ul>
                      {task.attachments.map((file, index) => (
                        <li key={index}>
                          <a href={file.url} target="_blank" rel="noopener noreferrer">
                            {file.name} ({file.date})
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="task-actions">
                <button onClick={() => onEdit(task)} className="edit-btn">
                  Modifier
                </button>
                <button onClick={() => onDelete(task.id)} className="danger-btn">
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

export default TasksManager;