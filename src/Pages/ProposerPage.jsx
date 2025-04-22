import React, { useState, useEffect } from 'react';
import '../Css/ProposerPage.css';
import SubjectList from '../components/SubjectList';
import SubjectFormEnseignant from '../components/SubjectFormEnseignant';

const ProposerPage = () => {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      title: "Système de recommandation pour bibliothèque",
      description: "Développer un système de recommandation de livres basé sur les préférences des utilisateurs"
    },
    {
      id: 2,
      title: "Application de gestion de projets académiques",
      description: "Créer une plateforme de gestion des projets PFA/PFE avec suivi des tâches"
    }
  ]);

  const [editingSubject, setEditingSubject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Fetch subjects from API would go here
    // fetch('/api/subjects').then(res => res.json()).then(data => setSubjects(data));
  }, []);

  const handleAddSubject = (subject) => {
    const newSubject = {
      ...subject,
      id: Date.now() // Temporary ID until saved to database
    };
    setSubjects([...subjects, newSubject]);
    setShowForm(false);
  };

  const handleUpdateSubject = (updatedSubject) => {
    setSubjects(subjects.map(subj => 
      subj.id === updatedSubject.id ? updatedSubject : subj
    ));
    setEditingSubject(null);
    setShowForm(false);
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce sujet?")) {
      setSubjects(subjects.filter(subj => subj.id !== id));
    }
  };

  return (
    <div className="proposer-container">
      <h1 className="proposer-title">Gestion des Sujets PFA</h1>
      
      <div className="proposer-actions">
        <button 
          onClick={() => {
            setEditingSubject(null);
            setShowForm(true);
          }}
          className="primary-btn"
        >
          Proposer un Nouveau Sujet
        </button>
      </div>

      {showForm && (
        <SubjectFormEnseignant
          subject={editingSubject}
          onAdd={handleAddSubject}
          onUpdate={handleUpdateSubject}
          onCancel={() => setShowForm(false)}
        />
      )}

      <SubjectList 
        subjects={subjects}
        onEdit={(subject) => {
          setEditingSubject(subject);
          setShowForm(true);
        }}
        onDelete={handleDeleteSubject}
      />
    </div>
  );
};

export default ProposerPage;