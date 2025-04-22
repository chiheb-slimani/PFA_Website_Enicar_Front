import React from 'react';
import PropTypes from 'prop-types';
import '../Css/SubjectCard.css';

const SubjectCard = ({ 
  subject, 
  isSelected, 
  onSelect, 
  currentRank,
  onRankChange,
  isRankingMode 
}) => {
  return (
    <div className={`subject-card ${isSelected ? 'selected' : ''}`}>
      <div className="subject-info">
        <h3>{subject.title}</h3>
        <p className="description">{subject.description}</p>
        <p className="teacher">Supervisor: {subject.teacher}</p>
      </div>
      
      {isSelected && isRankingMode ? (
        <div className="rank-controls">
          <button 
            onClick={() => onRankChange(subject.id, currentRank - 1)}
            disabled={currentRank <= 1}
            aria-label="Increase rank"
          >
            ↑
          </button>
          <span className="rank-badge">#{currentRank}</span>
          <button 
            onClick={() => onRankChange(subject.id, currentRank + 1)}
            disabled={currentRank >= 5}
            aria-label="Decrease rank"
          >
            ↓
          </button>
        </div>
      ) : (
        <button 
          onClick={() => onSelect(subject.id)}
          className="select-btn"
          aria-label={isSelected ? 'Deselect subject' : 'Select subject'}
        >
          {isSelected ? 'Remove' : 'Select'}
        </button>
      )}
    </div>
  );
};

SubjectCard.propTypes = {
  subject: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  currentRank: PropTypes.number,
  onRankChange: PropTypes.func,
  isRankingMode: PropTypes.bool
};

export default SubjectCard;