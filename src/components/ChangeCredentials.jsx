import React, { useState } from 'react';


const ChangeCredentials = ({ currentEmail, currentPassword, onUpdate }) => {
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState(currentPassword);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(email, password);
    setIsEditing(false);
  };

  return (
    <div className="credentials-form">
      <h2>Modifier mes identifiants</h2>
      
      {!isEditing ? (
        <div className="credentials-display">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Mot de passe:</strong> ********</p>
          <button 
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Modifier
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nouvel Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Nouveau Mot de passe:</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
              <button 
                type="button" 
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Cacher' : 'Montrer'}
              </button>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-button">
              Enregistrer
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => {
                setIsEditing(false);
                setEmail(currentEmail);
                setPassword(currentPassword);
              }}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangeCredentials;