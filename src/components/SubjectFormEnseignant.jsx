import React, { useState, useEffect } from 'react';

const SubjectFormEnseignant = ({ subject, onAdd, onUpdate, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filliere, setFilliere] = useState('mecatronique'); // Default value
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (subject) {
      setTitle(subject.title);
      setDescription(subject.description);
      setFilliere(subject.filliere || 'mecatronique');
    } else {
      setTitle('');
      setDescription('');
      setFilliere('mecatronique');
    }
  }, [subject]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Le titre est requis";
    if (!description.trim()) newErrors.description = "La description est requise";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const subjectData = { title, description, filliere };
    
    if (subject) {
      onUpdate({ ...subjectData, id: subject.id });
    } else {
      onAdd(subjectData);
    }
  };

  return (
    <div className="subject-form-container">
      <h2>{subject ? 'Modifier le Sujet' : 'Nouveau Sujet'}</h2>
      
      <form onSubmit={handleSubmit} className="subject-form">
        <div className="form-group">
          <label>Titre du Sujet:</label>
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
            rows="5"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Filliere:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="mecatronique"
                checked={filliere === 'mecatronique'}
                onChange={() => setFilliere('mecatronique')}
              />
              Mecatronique
            </label>
            <label>
              <input
                type="radio"
                value="indus"
                checked={filliere === 'indus'}
                onChange={() => setFilliere('indus')}
              />
              Indus
            </label>
            <label>
              <input
                type="radio"
                value="infotronique"
                checked={filliere === 'infotronique'}
                onChange={() => setFilliere('infotronique')}
              />
              Infotronique
            </label>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="primary-btn">
            {subject ? 'Mettre à jour' : 'Ajouter'}
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

export default SubjectFormEnseignant;