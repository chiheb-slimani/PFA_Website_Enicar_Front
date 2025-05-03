import React, { useState, useEffect } from 'react';

const UserForm = ({ user, defaultRole, defaultCategory, onAddUser, onUpdateUser, onCancel }) => {
  const [formData, setFormData] = useState({
    role: defaultRole,
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    category: defaultRole === 'etudiant' ? defaultCategory : '',
    moyenne: '',
    numero: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        motDePasse: user.password,
        category: user.category || defaultCategory,
        moyenne: user.moyenne || '',
        numero: user.numero || ''
      });
    } else {
      setFormData(prev => ({
        ...prev,
        role: defaultRole,
        category: defaultRole === 'etudiant' ? defaultCategory : '',
        moyenne: defaultRole === 'etudiant' ? prev.moyenne : '',
        numero: ''
      }));
    }
  }, [user, defaultRole, defaultCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateSecurePassword = () => {
    const currentPassword = formData.password;
    const specialChars = '!@#$%^&*()_+{}[]:;<>,.?/~';
    const numbers = '0123456789';
    const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';

    const passwordBase = currentPassword.length > 0
      ? currentPassword.substring(0, Math.min(4, currentPassword.length))
      : '';

    const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const randomUpper = upperLetters[Math.floor(Math.random() * upperLetters.length)];
    const randomLower = lowerLetters[Math.floor(Math.random() * lowerLetters.length)];

    const combined = passwordBase + randomSpecial + randomNumber + randomUpper + randomLower;
    const shuffled = combined.split('').sort(() => 0.5 - Math.random()).join('');
    const newPassword = shuffled.length >= 8 ? shuffled : shuffled + numbers + specialChars;

    setFormData(prev => ({ ...prev, password: newPassword.substring(0, 16) }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formData.password)
      .then(() => alert('Mot de passe copié dans le presse-papier!'))
      .catch(err => console.error('Erreur lors de la copie: ', err));
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
              <div className="password-input-container">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="password-actions">
                  <button 
                    type="button" 
                    className="generate-password-btn"
                    onClick={generateSecurePassword}
                  >
                    Générer
                  </button>
                  {formData.password && (
                    <button 
                      type="button" 
                      className="copy-password-btn"
                      onClick={copyToClipboard}
                      title="Copier le mot de passe"
                    >
                      📋
                    </button>
                  )}
                </div>
              </div>
              {formData.password && (
                <div className="password-strength">
                  Force: {formData.password.length >= 12 ? 'Fort' : 
                         formData.password.length >= 8 ? 'Moyen' : 'Faible'}
                </div>
              )}
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

          <div className="form-group">
            <label>Numéro *</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
              placeholder="Numéro"
            />
          </div>

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
