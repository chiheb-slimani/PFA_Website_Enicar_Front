import React from 'react';

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'infotronique', label: 'Infotronique' },
    { value: 'mecatronique', label: 'Mécatronique' },
    { value: 'indus', label: 'Indus' }
  ];

  return (
    <div className="category-selector">
      {categories.map(category => (
        <button
          key={category.value}
          className={`nav-button ${selectedCategory === category.value ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;