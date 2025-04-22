import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import RoleSelector from '../components/RoleSelector';
import CategorySelector from '../components/CategorySelector';
import '../Css/GestionPage.css';

const GestionPage = () => {
  const [users, setUsers] = useState([
    { id: 1, role: 'admin', nom: 'Admin', prenom: 'Super', email: 'admin@enicar.tn', password: 'admin123' },
    { id: 2, role: 'enseignant', nom: 'Prof', prenom: 'Math', email: 'math@enicar.tn', password: 'math123' },
    { id: 3, role: 'etudiant', nom: 'Doe', prenom: 'John', email: 'john@enicar.tn', password: 'pass123', moyenne: 14.5, category: 'infotronique' },
  ]);

  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('infotronique'); // Default to infotronique
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filteredUsers = users.filter(user => {
    const roleMatch = selectedRole === 'all' || user.role === selectedRole;
    const categoryMatch = selectedRole !== 'etudiant' || 
                         selectedCategory === 'all' || 
                         user.category === selectedCategory;
    return roleMatch && categoryMatch;
  });

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setShowForm(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
  };

  const handleDeleteUsers = () => {
    setUsers(users.filter(u => !selectedUsers.includes(u.id)));
    setSelectedUsers([]);
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(userId => userId !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="gestion-container">
      <h1>Gestion des Utilisateurs</h1>
      
      <RoleSelector 
        selectedRole={selectedRole}
        onSelectRole={(role) => {
          setSelectedRole(role);
          if (role !== 'etudiant') setSelectedCategory('all');
        }}
      />

      {selectedRole === 'etudiant' && (
        <CategorySelector 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      <div className="action-buttons">
        <button 
          className="nav-button"
          onClick={() => { 
            setShowForm(true); 
            setEditingUser(null); 
          }}
        >
          Ajouter Utilisateur
        </button>
        <button 
          className="nav-button danger"
          onClick={handleDeleteUsers}
          disabled={selectedUsers.length === 0}
        >
          Supprimer Sélection
        </button>
      </div>

      <UserTable 
        users={filteredUsers}
        selectedUsers={selectedUsers}
        selectedRole={selectedRole}
        onSelectUser={handleSelectUser}
        onEditUser={setEditingUser}
      />

      {(showForm || editingUser) && (
        <UserForm 
          user={editingUser}
          defaultRole={selectedRole !== 'all' ? selectedRole : 'etudiant'}
          defaultCategory={selectedCategory}
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          onCancel={() => { setShowForm(false); setEditingUser(null); }}
        />
      )}
    </div>
  );
};

export default GestionPage;