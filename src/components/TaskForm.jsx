import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onAdd, onUpdate, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('pending');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDeadline(task.deadline);
      setStatus(task.status);
    } else {
      setTitle('');
      setDescription('');
      setDeadline('');
      setStatus('pending');
    }
  }, [task]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Le titre est requis";
    if (!deadline) newErrors.deadline = "L'échéance est requise";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const taskData = { title, description, deadline, status };
    
    if (task) {
      onUpdate({ ...taskData, id: task.id, attachments: task.attachments });
    } else {
      onAdd(taskData);
    }
  };

  return (
    <div className="form-container">
      <h3>{task ? 'Modifier Tâche' : 'Nouvelle Tâche'}</h3>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Titre:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            placeholder="Détails de la tâche"
          />
        </div>
        
        <div className="form-group">
          <label>Échéance:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={errors.deadline ? 'error' : ''}
          />
          {errors.deadline && <span className="error-message">{errors.deadline}</span>}
        </div>
        
        {task && (
          <div className="form-group">
            <label>Statut:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">En cours</option>
              <option value="completed">Terminé</option>
            </select>
          </div>
        )}
        
        <div className="form-actions">
          <button type="submit" className="primary-btn">
            {task ? 'Mettre à jour' : 'Ajouter'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="secondary-btn"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;