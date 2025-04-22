import React, { useState } from 'react';
import ProjectDetails from '../components/ProjectDetails';
import TeamInfo from '../components/TeamInfo';
import MeetingsSection from '../components/MeetingsSection';
import TasksSection from '../components/TasksSection';
import '../Css/MonProjetPage.css';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Page montrant les informations du projet de fin d'études de l'utilisateur
 * 
 * @returns {JSX.Element} La page MonProjet
 */
/*******  6090ed1e-e997-41a6-9cca-03326ed1d2ae  *******/const MonProjetPage = () => {
  // Sample data - will be replaced with API calls
  const [project, setProject] = useState({
    title: "Système de recommandation intelligent",
    description: "Implémentation d'un système de recommandation basé sur le machine learning pour une plateforme e-commerce",
    supervisor: "Dr. Sami Kallel",
    supervisorEmail: "sami.kallel@enicar.tn",
    startDate: "2023-09-15",
    endDate: "2024-05-30",
    status: "En cours",
    binomes: [
      {
        prenom: "Mohamed",
        nom: "Ali",
        email: "mohamed.ali@enicar.tn"
      },
      {
        prenom: "Amina",
        nom: "Ben Ahmed",
        email: "amina.benahmed@enicar.tn"
      }
    ]
  });

  const [team, setTeam] = useState({
    member1: "Mohamed Ali",
    member2: "Amina Ben Ahmed",
    member1Email: "mohamed.ali@enicar.tn",
    member2Email: "amina.benahmed@enicar.tn"
  });

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      date: "2023-11-15",
      time: "14:00",
      location: "Salle B12",
      agenda: "Revue de l'analyse des données"
    },
    {
      id: 2,
      date: "2023-12-05",
      time: "10:30",
      location: "En ligne",
      agenda: "Présentation des premiers résultats"
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Analyse des besoins",
      deadline: "2023-10-15",
      status: "Terminé",
      file: "analyse_besoins.pdf"
    },
    {
      id: 2,
      name: "Collecte des données",
      deadline: "2023-11-20",
      status: "En cours",
      file: null
    },
    {
      id: 3,
      name: "Implémentation modèle",
      deadline: "2024-01-15",
      status: "À faire",
      file: null
    }
  ]);

  const handleFileUpload = (taskId, file) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, file: file.name } : task
    ));
    console.log(`Uploading file for task ${taskId}:`, file.name);
  };

  return (
    <div className="mon-projet-container">
      <h1>Mon Projet de Fin d'Années</h1>
      
      <div className="project-grid">
        <ProjectDetails project={project} />
        <TeamInfo team={team} />
        <MeetingsSection meetings={meetings} />
        <TasksSection tasks={tasks} onFileUpload={handleFileUpload} />
      </div>
    </div>
  );
};

export default MonProjetPage;