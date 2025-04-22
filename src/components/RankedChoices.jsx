import React from 'react';

const RankedChoices = ({ choices, onRankChange, onRemoveChoice, onEditProposed, maxChoices }) => {
  return (
    <div className="choices-section">
      <h2>Mes Choix Classés</h2>
      {choices.length === 0 ? (
        <p className="empty-message">Aucun sujet classé</p>
      ) : (
        <ol className="ranked-list">
          {choices.map(choice => (
            <li key={choice.id} className="ranked-item">
              <div className="rank-badge">{choice.rank}</div>
              
              <div className="choice-content">
                <h3>{choice.title}</h3>
                <p className="description">{choice.description}</p>
                <div className="supervisor-info">
                  <span>Encadrant: {choice.supervisor}</span>
                  {choice.isProposed && (
                    <span className="proposed-label">(Proposé par vous)</span>
                  )}
                </div>
                
                <div className="rank-controls">
                  <select
                    value={choice.rank}
                    onChange={(e) => onRankChange(choice, parseInt(e.target.value))}
                  >
                    {[...Array(maxChoices).keys()].map(i => (
                      <option key={i+1} value={i+1}>
                        Position {i+1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="choice-actions">
                {choice.isProposed && (
                  <button
                    className="nav-button small"
                    onClick={() => onEditProposed(choice)}
                  >
                    <i className="icon-edit"></i> Modifier
                  </button>
                )}
                <button
                  className="nav-button small danger"
                  onClick={() => onRemoveChoice(choice.id)}
                >
                  <i className="icon-delete"></i> Supprimer
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default RankedChoices;