import '../css/Footer.css'
import React, { useState } from 'react';

const Footer = ({ ajoutTache }) => {
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newDateEcheance, setNewDateEcheance] = useState("");
    const [newEtat, setNewEtat] = useState("Nouveau");
    const [newUrgent, setNewUrgent] = useState(false);
    const [showForm, setShowForm] = useState(false);
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
     
      ajoutTache(newTitle, newDescription, newDateEcheance, newEtat, newUrgent);
  
    
      setNewTitle("");
      setNewDescription("");
      setNewDateEcheance("");
      setNewEtat("Nouveau");
      setNewUrgent(false);
  
     
      setShowForm(false);
    };
  
    return (
      <div className='Footer'>
        {!showForm && (
          <button className='Ajouter' onClick={() => setShowForm(true)}>Ajouter une tâche</button>
        )}
 
        {showForm && (
          <form onSubmit={handleFormSubmit}>
            <h3>Ajouter une nouvelle tâche</h3>
  
            <label>
              Titre :
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </label>
  
            <label>
              Description :
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </label>
  
            <label>
              Date d'échéance :
              <input
                type="date"
                value={newDateEcheance}
                onChange={(e) => setNewDateEcheance(e.target.value)}
                required
              />
            </label>
  
            <label>
              Urgente :
              <input
                type="checkbox"
                checked={newUrgent}
                onChange={(e) => setNewUrgent(e.target.checked)}
              />
            </label>
  
            <label>
              État :
              <select
                value={newEtat}
                onChange={(e) => setNewEtat(e.target.value)}
              >
                <option value="Nouveau">Nouveau</option>
                <option value="En attente">En attente</option>
                <option value="Reussi">Reussi</option>
              </select>
            </label>
  
            <button className='Ajouter' type="submit">Ajouter la tâche</button>
          </form>
        )}
      </div>
    );
  };
export default Footer