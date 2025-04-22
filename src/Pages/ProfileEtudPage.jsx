import React, { useState } from 'react';
import '../Css/ProfilEtudPage.css';
import StudentInfo from '../components/StudentInfo';
import ChangeCredentials from '../components/ChangeCredentials';
import BinomeSection from '../components/BinomeSection';
import InvitationsBox from '../components/InvitationsBox';

const ProfilEtudPage = () => {
  const [studentData, setStudentData] = useState({
    nom: 'Dupont',
    prenom: 'Jean',
    mail: 'jean.dupont@email.com',
    password: '********',
    moyenne: 15.5,
    binome: {
      nom: 'Martin',
      prenom: 'Sophie',
      mail: 'sophie.martin@email.com',
      moyenne: 16.2
    }
  });

  const [invitations, setInvitations] = useState([
    { 
      id: 1, 
      from: 'pierre.durand@email.com', 
      fromName: 'Pierre Durand',
      moyenne: 14.8,
      status: 'pending',
      date: '2023-05-15'
    },
    { 
      id: 2, 
      from: 'marie.leroy@email.com',
      fromName: 'Marie Leroy',
      moyenne: 17.3,
      status: 'pending',
      date: '2023-05-16'
    }
  ]);

  // Calculate combined average
  const moyenneTotale = studentData.binome 
    ? ((studentData.moyenne + studentData.binome.moyenne) / 2).toFixed(2)
    : null;

  const handleUpdateCredentials = (newEmail, newPassword) => {
    setStudentData(prev => ({
      ...prev,
      mail: newEmail,
      password: newPassword
    }));
  };

  const handleInviteBinome = (email) => {
    if (!email.includes('@')) {
      alert("Veuillez entrer une adresse email valide");
      return;
    }
    
    if (email === studentData.mail) {
      alert("Vous ne pouvez pas vous inviter vous-même!");
      return;
    }

    setInvitations(prev => [
      ...prev,
      { 
        id: Date.now(),
        from: studentData.mail,
        fromName: `${studentData.prenom} ${studentData.nom}`,
        moyenne: studentData.moyenne,
        to: email,
        status: 'sent',
        date: new Date().toLocaleDateString()
      }
    ]);
    alert(`Invitation envoyée à ${email}`);
  };

  const handleRespondToInvitation = (invitationId, accept) => {
    if (accept) {
      const invitation = invitations.find(inv => inv.id === invitationId);
      if (invitation) {
        setStudentData(prev => ({
          ...prev,
          binome: {
            nom: invitation.fromName.split(' ')[1],
            prenom: invitation.fromName.split(' ')[0],
            mail: invitation.from,
            moyenne: invitation.moyenne
          }
        }));
      }
    }
    
    setInvitations(prev => 
      prev.filter(inv => inv.id !== invitationId)
    );
  };

  const handleRemoveBinome = () => {
    if (window.confirm("Êtes-vous sûr de vouloir retirer votre binôme?")) {
      setStudentData(prev => ({
        ...prev,
        binome: null
      }));
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mon Profil Étudiant</h1>
      
      <div className="profile-sections">
        <div className="profile-section">
          <StudentInfo 
            nom={studentData.nom} 
            prenom={studentData.prenom} 
            mail={studentData.mail}
            moyenne={studentData.moyenne}
            moyenneTotale={moyenneTotale}
          />
        </div>
        
        <div className="profile-section">
          <ChangeCredentials 
            currentEmail={studentData.mail} 
            currentPassword={studentData.password} 
            onUpdate={handleUpdateCredentials} 
          />
        </div>
        
        <div className="profile-section">
          <BinomeSection 
            binome={studentData.binome} 
            onInvite={handleInviteBinome} 
            onRemove={handleRemoveBinome}
            currentEmail={studentData.mail}
            studentMoyenne={studentData.moyenne}
            moyenneTotale={moyenneTotale}
          />
        </div>
        
        {invitations.some(inv => inv.status === 'pending') && (
          <div className="profile-section">
            <InvitationsBox 
              invitations={invitations.filter(inv => inv.status === 'pending')} 
              onRespond={handleRespondToInvitation} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilEtudPage;