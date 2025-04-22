import React, { useState, useEffect } from 'react';

const MeetingForm = ({ meeting, onAdd, onUpdate, onCancel }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (meeting) {
      setDate(meeting.date);
      setTime(meeting.time);
      setLocation(meeting.location);
      setDescription(meeting.description);
    } else {
      setDate('');
      setTime('');
      setLocation('');
      setDescription('');
    }
  }, [meeting]);

  const validate = () => {
    const newErrors = {};
    if (!date) newErrors.date = "La date est requise";
    if (!time) newErrors.time = "L'heure est requise";
    if (!location.trim()) newErrors.location = "Le lieu est requis";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const meetingData = { date, time, location, description };
    
    if (meeting) {
      onUpdate({ ...meetingData, id: meeting.id });
    } else {
      onAdd(meetingData);
    }
  };

  return (
    <div className="form-container">
      <h3>{meeting ? 'Modifier Rendez-vous' : 'Nouveau Rendez-vous'}</h3>
      
      <form onSubmit={handleSubmit} className="meeting-form">
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
        
        <div className="form-group">
          <label>Heure:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={errors.time ? 'error' : ''}
          />
          {errors.time && <span className="error-message">{errors.time}</span>}
        </div>
        
        <div className="form-group">
          <label>Lieu:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Salle ou bâtiment"
            className={errors.location ? 'error' : ''}
          />
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            placeholder="Objectif du rendez-vous"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="primary-btn">
            {meeting ? 'Mettre à jour' : 'Ajouter'}
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

export default MeetingForm;