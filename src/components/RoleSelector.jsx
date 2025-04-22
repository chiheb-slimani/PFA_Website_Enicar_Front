import React from 'react';

const RoleSelector = ({ selectedRole, onSelectRole }) => {
  const roles = [
    { value: 'all', label: 'Tous' },
    { value: 'admin', label: 'Admins' },
    { value: 'enseignant', label: 'Enseignants' },
    { value: 'etudiant', label: 'Étudiants' }
  ];

  return (
    <div className="role-selector">
      {roles.map(role => (
        <button
          key={role.value}
          className={`nav-button ${selectedRole === role.value ? 'active' : ''}`}
          onClick={() => onSelectRole(role.value)}
        >
          {role.label}
        </button>
      ))}
    </div>
  );
};

export default RoleSelector;