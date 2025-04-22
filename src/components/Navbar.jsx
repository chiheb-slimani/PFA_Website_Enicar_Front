import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Css/Navbar.css';
import Button from './Button'; // ✅ Import your styled Button component
import logoImage from '../assets/Logo_ENICarthage.jpg';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/home');
  };

  const getNavItems = () => {
    if (!user) {
      return [
        { label: 'Home', path: '/home' },
        { label: 'Login', path: '/login' }
      ];
    }

    switch (user.role) {
      case 'student':
        return [
          { label: 'Choix', path: '/student/choix' },
          { label: 'Mon Projet', path: '/student/mon-projet' },
          { label: 'Messagerie', path: '/student/messagerie' },
          { label: 'Profil', path: '/student/profil' },
          { label: 'Déconnexion', action: handleLogout }
        ];
      case 'teacher':
        return [
          { label: 'Proposer Mes Sujets', path: '/teacher/proposer' },
          { label: 'Messagerie', path: '/teacher/messagerie' },
          { label: 'Suivi', path: '/teacher/suivi' },
          { label: 'Déconnexion', action: handleLogout }
        ];
      case 'admin':
        return [
          { label: 'Gestion des Étudiants', path: '/admin/gestion-etudiants' },
                    { label: 'Déconnexion', action: handleLogout }
        ];
      default:
        return [
          { label: 'Home', path: '/home' },
          { label: 'Login', path: '/login' }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/home">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </Link>
      </div>

      <div className="nav-buttons">
        {navItems.map((item, index) =>
          item.path ? (
            <Link key={index} to={item.path} className="nav-link">
              {item.label}
            </Link>
          ) : (
            <Button key={index} onClick={item.action} >
              {item.label}
            </Button>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
