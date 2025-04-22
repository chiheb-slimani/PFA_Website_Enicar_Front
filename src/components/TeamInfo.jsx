import React from 'react';

const TeamInfo = ({ team }) => {
  return (
    <div className="project-card team-card">
      <h2>Équipe de Projet</h2>
      <div className="team-members">
        <div className="member">
          <h3>Étudiant 1</h3>
          <p>{team.member1}</p>
          <p>{team.member1Email}</p>
        </div>
        <div className="member">
          <h3>Étudiant 2</h3>
          <p>{team.member2}</p>
          <p>{team.member2Email}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;