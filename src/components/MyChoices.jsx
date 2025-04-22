import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MyChoices = ({ choices, onRemoveChoice, onReorder, onEditProposed }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <div className="choices-section">
      <h2>Mes Choix (Ordre de priorité)</h2>
      {choices.length === 0 ? (
        <p className="empty-message">Vous n'avez pas encore sélectionné de sujets</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="choices">
            {(provided) => (
              <ul 
                className="choices-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {choices.map((choice, index) => (
                  <Draggable key={choice.id} draggableId={String(choice.id)} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="choice-card"
                      >
                        <div className="priority-number">{index + 1}</div>
                        <div className="choice-content">
                          <h3>{choice.title}</h3>
                          <p className="description">{choice.description}</p>
                          <div className="supervisor-info">
                            <span>Encadrant: {choice.supervisor}</span>
                            {choice.isProposed && (
                              <span className="proposed-label">(Proposé par vous)</span>
                            )}
                          </div>
                        </div>
                        <div className="choice-actions">
                          {choice.isProposed && (
                            <button
                              className="nav-button small"
                              onClick={() => onEditProposed(choice)}
                            >
                              Modifier
                            </button>
                          )}
                          <button
                            className="nav-button small danger"
                            onClick={() => onRemoveChoice(choice.id)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default MyChoices;