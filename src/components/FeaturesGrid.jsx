import React from 'react';
import FeatureCard from './FeatureCard';
import '../Css/FeaturesGrid.css';

const FeaturesGrid = () => {
  const features = [
    {
      icon: "📊",
      title: "Gestion des Stages et Suivi",
      description: "Espace dédié pour les étudiants, enseignants."
    },
    {
      icon: "🔒",
      title: "Platforme securisé",
      description: "Vos données sur notre site sont sécurisées et accessibles uniquement par l'administration de L'ENICARthage."
    },
    {
      icon: "✉️",
      title: "Communication et Collaboration",
      description: "Messagerie interne entre étudiants, tuteurs académiques et tuteurs en entreprise."
    }
  ];

  return (
    <section className="features-section">
      {features.map((feature, index) => (
        <FeatureCard 
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
};

export default FeaturesGrid;