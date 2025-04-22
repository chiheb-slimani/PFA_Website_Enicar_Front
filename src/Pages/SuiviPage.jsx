import React, { useState } from 'react';
import '../Css/SuiviPage.css';
import ProjectSelector from '../components/ProjectSelector';
import ProjectDetails from '../components/ProjectDetails';
import MeetingsManager from '../components/MeetingsManager';
import TasksManager from '../components/TasksManager';
import MeetingForm from '../components/MeetingForm';
import TaskForm from '../components/TaskForm';

const SuiviPage = () => {
  // Sample projects data with meetings and tasks
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Système de recommandation pour bibliothèque",
      description: "Développer un système de recommandation de livres basé sur les préférences des utilisateurs",
      binomes: [
        { nom: "Dupont", prenom: "Jean", email: "jean.dupont@email.com" },
        { nom: "Martin", prenom: "Sophie", email: "sophie.martin@email.com" }
      ],
      meetings: [
        { 
          id: 1, 
          date: "2023-06-15", 
          time: "14:00", 
          location: "Salle B203", 
          description: "Revue des exigences" 
        }
      ],
      tasks: [
        {
          id: 1,
          title: "Analyse des besoins",
          description: "Document d'analyse fonctionnelle",
          deadline: "2023-06-20",
          status: "completed",
          attachments: [
            { name: "analyse.pdf", url: "#", date: "2023-06-18" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Application de gestion de projets",
      description: "Plateforme de gestion des projets académiques",
      binomes: [
        { nom: "Leroy", prenom: "Marie", email: "marie.leroy@email.com" }
      ],
      meetings: [],
      tasks: []
    }
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Find the selected project
  const selectedProject = projects.find(project => project.id === selectedProjectId);

  // Meeting handlers
  const handleAddMeeting = (meeting) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          meetings: [...project.meetings, { ...meeting, id: Date.now() }]
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    setShowMeetingForm(false);
  };

  const handleUpdateMeeting = (updatedMeeting) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          meetings: project.meetings.map(m => 
            m.id === updatedMeeting.id ? updatedMeeting : m
          )
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    setEditingMeeting(null);
    setShowMeetingForm(false);
  };

  const handleDeleteMeeting = (meetingId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          meetings: project.meetings.filter(m => m.id !== meetingId)
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  // Task handlers
  const handleAddTask = (task) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          tasks: [...project.tasks, { 
            ...task, 
            id: Date.now(), 
            status: "pending", 
            attachments: [] 
          }]
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    setShowTaskForm(false);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          tasks: project.tasks.map(t => 
            t.id === updatedTask.id ? updatedTask : t
          )
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleDeleteTask = (taskId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          tasks: project.tasks.filter(t => t.id !== taskId)
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  return (
    <div className="suivi-container">
      <h1 className="suivi-title">Suivi des Projets PFA</h1>
      
      <ProjectSelector 
        projects={projects} 
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
      />
      
      {selectedProject ? (
        <div className="project-content">
          <ProjectDetails project={selectedProject} />
          
          <div className="management-sections">
            <MeetingsManager 
              meetings={selectedProject.meetings}
              onAdd={() => {
                setEditingMeeting(null);
                setShowMeetingForm(true);
              }}
              onEdit={(meeting) => {
                setEditingMeeting(meeting);
                setShowMeetingForm(true);
              }}
              onDelete={handleDeleteMeeting}
            />
            
            <TasksManager 
              tasks={selectedProject.tasks}
              onAdd={() => {
                setEditingTask(null);
                setShowTaskForm(true);
              }}
              onEdit={(task) => {
                setEditingTask(task);
                setShowTaskForm(true);
              }}
              onDelete={handleDeleteTask}
            />
          </div>
          
          {showMeetingForm && (
            <MeetingForm 
              meeting={editingMeeting}
              onAdd={handleAddMeeting}
              onUpdate={handleUpdateMeeting}
              onCancel={() => setShowMeetingForm(false)}
            />
          )}
          
          {showTaskForm && (
            <TaskForm 
              task={editingTask}
              onAdd={handleAddTask}
              onUpdate={handleUpdateTask}
              onCancel={() => setShowTaskForm(false)}
            />
          )}
        </div>
      ) : (
        <div className="no-project-selected">
          <p>Sélectionnez un projet pour commencer le suivi</p>
        </div>
      )}
    </div>
  );
};

export default SuiviPage;