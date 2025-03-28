import React from 'react';
import './Filter.css';

const Filters = ({
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
  return (
    <div className="filters">
      
      <label>Trier par :</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date_creation">Date de création</option>
        <option value="date_echeance">Date d'échéance</option>
        <option value="title">Nom</option>
      </select>

    
      <label>Catégorie :</label>
      <select multiple onChange={(e) => {
        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
        setFilterCategory(selected);
      }}>
        <option value="">Toutes</option>
        {currentTodos.categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.title}</option>
        ))}
      </select>

     
      <label>Urgence :</label>
      <select onChange={(e) => setFilterUrgent(e.target.value)}>
        <option value="">Toutes</option>
        <option value="true">Urgentes</option>
        <option value="false">Non urgentes</option>
      </select>

     
      <label>État :</label>
      <select multiple onChange={(e) => {
        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
        setFilterEtat(selected);
      }}>
        <option value="">Tous</option>
        <option value="Nouveau">Nouveau</option>
        <option value="En attente">En attente</option>
        <option value="Reussi">Réussi</option>
      </select>

      
      <label>Fait/Pas fait :</label>
      <select onChange={(e) => setFilterFait(e.target.value)}>
        <option value="">Tous</option>
        <option value="true">Fait</option>
        <option value="false">Pas fait</option>
      </select>
    </div>
  );
};

export default Filters;
