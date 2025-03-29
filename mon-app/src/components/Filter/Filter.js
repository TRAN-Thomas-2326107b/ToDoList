import React from 'react';
import './Filter.css';

const Filter = ({
  sortBy,
  setSortBy,
  filterCategory,
  setFilterCategory,
  filterEtat,
  setFilterEtat,
  filterUrgent,
  setFilterUrgent,
  filterFait,
  setFilterFait,
  currentTodos
}) => {

  const handleCategoryChange = (id) => {
    setFilterCategory(prev => 
      prev.includes(id) ? prev.filter(cat => cat !== id) : [...prev, id]
    );
  };

  const handleEtatChange = (etat) => {
    setFilterEtat(prev => 
      prev.includes(etat) ? prev.filter(e => e !== etat) : [...prev, etat]
    );
  };

  return (
    <div className="filter">
      <label>Trier par :</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date_creation">Date de création</option>
        <option value="date_echeance">Date d'échéance</option>
        <option value="title">Nom</option>
      </select>

      <label>Catégorie :</label>
      <div className="filter-checkbox-group">
        <label>
          <input 
            type="checkbox" 
            checked={filterCategory.length === 0} 
            onChange={() => setFilterCategory([])} 
          />
          Toutes
        </label>
        {currentTodos.categories.map(cat => (
          <label key={cat.id}>
            <input 
              type="checkbox" 
              checked={filterCategory.includes(cat.id.toString())} 
              onChange={() => handleCategoryChange(cat.id.toString())} 
            />
            {cat.title}
          </label>
        ))}
      </div>

      <label>Urgence :</label>
      <select value={filterUrgent || ""} onChange={(e) => setFilterUrgent(e.target.value)}>
        <option value="">Toutes</option>
        <option value="true">Urgentes</option>
        <option value="false">Non urgentes</option>
      </select>

      <label>État :</label>
      <div className="filter-checkbox-group">
        <label>
          <input 
            type="checkbox" 
            checked={filterEtat.length === 0} 
            onChange={() => setFilterEtat([])} 
          />
          Tous
        </label>
        {["Nouveau", "En attente", "Reussi"].map(etat => (
          <label key={etat}>
            <input 
              type="checkbox" 
              checked={filterEtat.includes(etat)} 
              onChange={() => handleEtatChange(etat)} 
            />
            {etat}
          </label>
        ))}
      </div>

      <label>Fait/Pas fait :</label>
      <select value={filterFait || ""} onChange={(e) => setFilterFait(e.target.value)}>
        <option value="">Tous</option>
        <option value="true">Fait</option>
        <option value="false">Pas fait</option>
      </select>
    </div>
  );
};

export default Filter;
