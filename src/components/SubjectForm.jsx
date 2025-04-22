import React, { useState, useEffect } from 'react';

const SubjectForm = ({ subject, onProposeSubject, onUpdateProposed, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    supervisor: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        title: subject.title,
        description: subject.description,
        supervisor: subject.supervisor,
        email: subject.email,
        notes: subject.notes || ''
      });
    }
  }, [subject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject) {
      onUpdateProposed({ ...subject, ...formData });
    } else {
      onProposeSubject(formData);
    }
  };

  return (
    <div className="form-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{subject ? 'Modifier Sujet Proposé' : 'Proposer un Nouveau Sujet'}</h2>
          <button className="close-button" onClick={onCancel}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="subject-form">
          <div className="form-group">
            <label>Titre du Sujet *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Nom de l'Encadrant *</label>
              <input
                type="text"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Encadrant *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Notes Complémentaires</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Annuler
            </button>
            <button type="submit" className="confirm-button">
              {subject ? 'Mettre à jour' : 'Confirmer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;