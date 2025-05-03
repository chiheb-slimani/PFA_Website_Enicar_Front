import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import RoleSelector from '../components/RoleSelector';
import CategorySelector from '../components/CategorySelector';
import '../Css/GestionPage.css';

const GestionPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('infotronique');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const [adminRes, enseignantRes, etudiantRes] = await Promise.all([
        axios.get('http://localhost:8081/admins'),
        axios.get('http://localhost:8081/enseignants'),
        axios.get('http://localhost:8081/etudiants'),
      ]);

      const admins = adminRes.data.data.map(admin => ({
        id: admin.numero,
        role: 'admin',
        nom: admin.nom,
        prenom: admin.prenom,
        email: admin.email,
        motDePasse: admin.motDePasse,
        numero: admin.numero,
      }));

      const enseignants = enseignantRes.data.data.map(ens => ({
        id: ens.id,
        role: 'enseignant',
        nom: ens.nom,
        email: ens.email,
        password: ens.motDePasse,
        filiere: ens.filiere,
      }));

      const etudiants = etudiantRes.data.data.map(etu => ({
        id: etu.id,
        role: 'etudiant',
        nom: etu.nom,
        email: etu.email,
        password: etu.motDePasse,
        moyenne: etu.moyenne,
        category: etu.category || 'infotronique',
      }));

      setUsers([...admins, ...enseignants, ...etudiants]);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    const roleMatch = selectedRole === 'all' || user.role === selectedRole;
    const categoryMatch = selectedRole !== 'etudiant' ||
      selectedCategory === 'all' ||
      user.category === selectedCategory;
    return roleMatch && categoryMatch;
  });

  const handleAddUser = async (newUser) => {
    try {
      let response;

      if (newUser.role === 'admin') {
        const payload = {
          numero: parseInt(newUser.numero), // ✅ FIXED: using numero instead of id
          nom: newUser.nom,
          prenom: newUser.prenom,
          email: newUser.email,
          motDePasse: newUser.password,
        };

        console.log("📤 Payload to send (admin):", payload);
        response = await axios.post('http://localhost:8081/admins', payload);
      } else if (newUser.role === 'enseignant') {
        const payload = {
          nom: newUser.nom,
          email: newUser.email,
          motDePasse: newUser.password,
          filiere: newUser.filiere,
        };

        console.log("📤 Payload to send (enseignant):", payload);
        response = await axios.post('http://localhost:8081/enseignants', payload);
      } else if (newUser.role === 'etudiant') {
        const payload = {
          nom: newUser.nom,
          email: newUser.email,
          motDePasse: newUser.password,
          moyenne: parseFloat(newUser.moyenne),
        };

        console.log("📤 Payload to send (etudiant):", payload);
        response = await axios.post('http://localhost:8081/etudiants', payload);
      }

      if (response?.data?.data) {
        const created = response.data.data;
        const formatted = {
          id: created.id || created.numero,
          ...created,
          role: newUser.role,
          motDePasse: created.motDePasse,
          category: newUser.category,
        };
        setUsers(prev => [...prev, formatted]);
      }

      setShowForm(false);
    } catch (err) {
      console.error('Erreur détaillée:', err.response?.data || err.message);
      alert(
        'Erreur lors de l\'ajout de l\'utilisateur: ' +
          (err.response?.data?.message || err.message)
      );
    }
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
          onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default GestionPage;
