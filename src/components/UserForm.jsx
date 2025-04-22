import React, { useState, useEffect } from 'react';

const UserForm = ({ user, defaultRole, defaultCategory, onAddUser, onUpdateUser, onCancel }) => {
  const [formData, setFormData] = useState({
    role: defaultRole,
    nom: '',
    prenom: '',
    email: '',
    password: '',
    category: defaultRole === 'etudiant' ? defaultCategory : '',
    moyenne: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        password: user.password,
        category: user.category || defaultCategory,
        moyenne: user.moyenne || ''
      });
    } else {
      setFormData(prev => ({
        ...prev,
        role: defaultRole,
        category: defaultRole === 'etudiant' ? defaultCategory : '',
        moyenne: defaultRole === 'etudiant' ? prev.moyenne : ''
      }));
    }
  }, [user, defaultRole, defaultCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { ...formData };
    
    if (userData.role !== 'etudiant') {
      delete userData.category;
      delete userData.moyenne;
    }
    
    if (user) {
      onUpdateUser({ ...user, ...userData });
    } else {
      onAddUser(userData);
    }
  };

  return (
    <div className="form-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{user ? 'Modifier Utilisateur' : 'Ajouter un Nouvel Utilisateur'}</h2>
          <button className="close-button" onClick={onCancel}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label>Rôle *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="admin">Administrateur</option>
              <option value="enseignant">Enseignant</option>
              <option value="etudiant">Étudiant</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Prénom *</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Mot de passe *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {formData.role === 'etudiant' && (
            <div className="form-row">
              <div className="form-group">
                <label>Filière *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="infotronique">Infotronique</option>
                  <option value="mecatronique">Mécatronique</option>
                  <option value="indus">Indus</option>
                </select>
              </div>
              <div className="form-group">
                <label>Moyenne</label>
                <input
                  type="number"
                  name="moyenne"
                  value={formData.moyenne}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="20"
                />
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Annuler
            </button>
            <button type="submit" className="confirm-button">
              {user ? 'Mettre à jour' : 'Confirmer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;