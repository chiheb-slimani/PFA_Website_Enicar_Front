import React, { useState } from 'react';

const BinomeSection = ({ binome, onInvite, onRemove, currentEmail, studentMoyenne, moyenneTotale }) => {
  const [email, setEmail] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError("Veuillez entrer un email");
      return;
    }
    
    if (!email.includes('@')) {
      setError("Email invalide");
      return;
    }
    
    if (email === currentEmail) {
      setError("Vous ne pouvez pas vous inviter vous-même");
      return;
    }
    
    onInvite(email);
    setEmail('');
    setShowInviteForm(false);
  };

  return (
    <div className="binome-section">
      <h2>Gestion du Binôme</h2>
      
      {binome ? (
        <div className="binome-info">
          <h3>Binôme actuel</h3>
          <div className="info-grid">
            <div className="info-label">Nom:</div>
            <div className="info-value">{binome.nom}</div>
            
            <div className="info-label">Prénom:</div>
            <div className="info-value">{binome.prenom}</div>
            
            <div className="info-label">Email:</div>
            <div className="info-value">{binome.mail}</div>
            
            <div className="info-label">Moyenne:</div>
            <div className="info-value">{binome.moyenne}/20</div>
            
            <div className="info-label">Ma moyenne:</div>
            <div className="info-value">{studentMoyenne}/20</div>
            
            <div className="info-label">Moyenne totale:</div>
            <div className="info-value">{moyenneTotale}/20</div>
          </div>
          
          <button 
            onClick={onRemove}
            className="danger-btn"
          >
            Retirer le binôme
          </button>
        </div>
      ) : (
        <div className="no-binome">
          <h3>Inviter un binôme</h3>
          <p>Vous n'avez pas de binôme actuellement</p>
          
          {!showInviteForm ? (
            <button 
              onClick={() => setShowInviteForm(true)}
              className="primary-btn"
            >
              Inviter par email
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="invite-form">
              <div className="form-group">
                <label>Email du binôme:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemple.com"
                  required
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-actions">
                <button type="submit" className="primary-btn">
                  Envoyer l'invitation
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowInviteForm(false);
                    setError('');
                  }}
                  className="secondary-btn"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default BinomeSection;