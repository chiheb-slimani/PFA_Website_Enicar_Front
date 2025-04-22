import React, { useState } from 'react';
import AvailableSubjects from '../components/AvailableSubjects';
import RankedChoices from '../components/RankedChoices';
import SubjectForm from '../components/SubjectForm';
import '../Css/ChoixPage.css';

const MAX_CHOICES = 5;

const ChoixPage = () => {
  const [availableSubjects, setAvailableSubjects] = useState([
    {
      id: 1,
      title: "Système de gestion des PFE",
      description: "Développement d'une plateforme web pour la gestion des projets de fin d'études avec React et Node.js",
      supervisor: "Dr. Ahmed Ben Salah",
      email: "ahmed.bensalah@enicar.tn",
      notes: "Connaissances en React et Node.js requises",
      isProposed: false
    },
    {
      id: 2,
      title: "Application mobile de suivi médical",
      description: "Développement d'une application mobile pour le suivi des patients chroniques",
      supervisor: "Prof. Leila Trabelsi",
      email: "leila.trabelsi@enicar.tn",
      notes: "Expérience en React Native souhaitée",
      isProposed: false
    },
    {
      id: 3,
      title: "Système de recommandation intelligent",
      description: "Implémentation d'un système de recommandation basé sur le machine learning",
      supervisor: "Dr. Sami Kallel",
      email: "sami.kallel@enicar.tn",
      notes: "Connaissances en Python et TensorFlow",
      isProposed: false
    },
    {
      id: 4,
      title: "Plateforme e-learning interactive",
      description: "Création d'une plateforme d'apprentissage en ligne avec outils collaboratifs",
      supervisor: "Dr. Mariem Ben Hassen",
      email: "mariem.benhassen@enicar.tn",
      notes: "Expérience en Angular ou Vue.js",
      isProposed: false
    },
    {
      id: 5,
      title: "Système de gestion énergétique intelligent",
      description: "Développement d'un système IoT pour la gestion optimale de l'énergie",
      supervisor: "Prof. Karim Dridi",
      email: "karim.dridi@enicar.tn",
      notes: "Connaissances en Arduino/Raspberry Pi",
      isProposed: false
    },
    {
      id: 6,
      title: "Analyse des sentiments sur les réseaux sociaux",
      description: "Création d'un outil d'analyse des sentiments en temps réel",
      supervisor: "Dr. Salma Bouzid",
      email: "salma.bouzid@enicar.tn",
      notes: "Expérience en NLP et traitement de texte",
      isProposed: false
    }
  ]);

  const [rankedChoices, setRankedChoices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRankSelection = (subject, selectedRank) => {
    setRankedChoices(prev => {
      const existingAtRank = prev.find(choice => choice.rank === selectedRank);
      
      // Only swap if the rank is already taken
      if (existingAtRank) {
        return prev.map(choice => {
          if (choice.id === existingAtRank.id) {
            return { ...subject, rank: selectedRank };
          }
          if (choice.id === subject.id) {
            return { ...existingAtRank, rank: selectedRank };
          }
          return choice;
        }).sort((a, b) => a.rank - b.rank);
      }
      
      // Otherwise just add/update the subject
      return [
        ...prev.filter(choice => choice.id !== subject.id),
        { ...subject, rank: selectedRank }
      ].sort((a, b) => a.rank - b.rank);
    });
  };

  const handleRemoveChoice = (id) => {
    setRankedChoices(prev => prev.filter(choice => choice.id !== id));
  };

  const handleProposeSubject = (newSubject) => {
    const subjectWithId = { 
      ...newSubject, 
      id: Date.now(), 
      isProposed: true 
    };
    setAvailableSubjects([subjectWithId, ...availableSubjects]);
    handleRankSelection(subjectWithId, 1);
    setShowForm(false);
  };

  const handleUpdateProposed = (updatedSubject) => {
    setAvailableSubjects(availableSubjects.map(subject => 
      subject.id === updatedSubject.id ? updatedSubject : subject
    ));
    setRankedChoices(rankedChoices.map(choice => 
      choice.id === updatedSubject.id ? { ...updatedSubject, rank: choice.rank } : choice
    ));
    setEditingSubject(null);
  };

  const handleSubmitChoices = () => {
    setIsSubmitting(true);
    console.log("Submitting choices:", rankedChoices);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Vos choix ont été enregistrés avec succès!");
    }, 1500);
  };

  return (
    <div className="choix-container">
      <h1>Choix des Sujets PFA</h1>
      
      <div className="actions-header">
        <button 
          className="propose-button"
          onClick={() => { setShowForm(true); setEditingSubject(null); }}
        >
          <i className="icon-add"></i> Proposer un Sujet
        </button>
        <span className="choices-counter">
          {rankedChoices.length}/{MAX_CHOICES} sujets classés
        </span>
      </div>

      <div className="content-grid">
        <AvailableSubjects 
          subjects={availableSubjects.filter(s => !rankedChoices.some(c => c.id === s.id))}
          onRankSelection={handleRankSelection}
          remainingSlots={MAX_CHOICES - rankedChoices.length}
          maxChoices={MAX_CHOICES}
        />
        
        <RankedChoices 
          choices={rankedChoices}
          onRankChange={handleRankSelection}
          onRemoveChoice={handleRemoveChoice}
          onEditProposed={setEditingSubject}
          maxChoices={MAX_CHOICES}
        />
      </div>

      {rankedChoices.length > 0 && (
        <div className="submit-section">
          <button 
            className="submit-button"
            onClick={handleSubmitChoices}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Confirmer mes choix'}
          </button>
        </div>
      )}

      {(showForm || editingSubject) && (
        <SubjectForm 
          subject={editingSubject}
          onProposeSubject={handleProposeSubject}
          onUpdateProposed={handleUpdateProposed}
          onCancel={() => { setShowForm(false); setEditingSubject(null); }}
        />
      )}
    </div>
  );
};

export default ChoixPage;