import React from 'react';

const UserTable = ({ users, selectedUsers, selectedRole, onSelectUser, onEditUser }) => {
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th></th>
            <th>Rôle</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            {(selectedRole === 'etudiant' || selectedRole === 'all') && <th>Filière</th>}
            {(selectedRole === 'etudiant' || selectedRole === 'all') && <th>Moyenne</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => onSelectUser(user.id)}
                />
              </td>
              <td>
                <span className={`role-badge ${user.role}`}>
                  {user.role === 'admin' ? 'Admin' : 
                   user.role === 'enseignant' ? 'Enseignant' : 'Étudiant'}
                </span>
              </td>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              {(selectedRole === 'etudiant' || selectedRole === 'all') && (
                <td>{user.role === 'etudiant' ? user.category || '-' : '-'}</td>
              )}
              {(selectedRole === 'etudiant' || selectedRole === 'all') && (
                <td>{user.role === 'etudiant' ? user.moyenne || '-' : '-'}</td>
              )}
              <td>
                <button 
                  className="nav-button small"
                  onClick={() => onEditUser(user)}
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;