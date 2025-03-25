import React, { useState } from 'react';
import '../css/Footer.css';
import Modal from './Modal';

const Footer = ({ ajoutTache, ajoutCategorie, categories, setActiveTab, activeTab }) => {
  const [showTacheModal, setShowTacheModal] = useState(false);
  const [showCategorieModal, setShowCategorieModal] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDateEcheance, setNewDateEcheance] = useState("");
  const [newEtat, setNewEtat] = useState("Nouveau");
  const [newUrgent, setNewUrgent] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#000000");

  const handleTacheSubmit = (e) => {
    e.preventDefault();
    ajoutTache(newTitle, newDescription, newDateEcheance, newEtat, newUrgent, selectedCategory);
    setShowTacheModal(false);
  };

  const handleCategorieSubmit = (e) => {
    e.preventDefault();
    ajoutCategorie(newCategoryTitle, newCategoryColor);
    setShowCategorieModal(false);
  };

  return (
    <div className="Footer">
      <button className="Ajouter" onClick={() => setShowTacheModal(true)}>Ajouter une tâche</button>
      <button className="Ajouter" onClick={() => setShowCategorieModal(true)}>Ajouter une catégorie</button>

      {/* Modals for adding task and category */}
      <Modal show={showTacheModal} onClose={() => setShowTacheModal(false)}>
        <h3>Ajouter une nouvelle tâche</h3>
        <form onSubmit={handleTacheSubmit}>
          <label>
            Titre :
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
          </label>

          <label>
            Description :
            <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
          </label>

          <label>
            Date d'échéance :
            <input type="date" value={newDateEcheance} onChange={(e) => setNewDateEcheance(e.target.value)} required />
          </label>

          <label>
            Urgente :
            <input type="checkbox" checked={newUrgent} onChange={(e) => setNewUrgent(e.target.checked)} />
          </label>

          <label>
            État :
            <select value={newEtat} onChange={(e) => setNewEtat(e.target.value)}>
              <option value="Nouveau">Nouveau</option>
              <option value="En attente">En attente</option>
              <option value="Reussi">Réussi</option>
            </select>
          </label>

          <label>
            Catégorie :
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Aucune</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </label>

          <button className="Ajouter" type="submit">Ajouter la tâche</button>
        </form>
      </Modal>

      <Modal show={showCategorieModal} onClose={() => setShowCategorieModal(false)}>
        <h3>Ajouter une nouvelle catégorie</h3>
        <form onSubmit={handleCategorieSubmit}>
          <label>
            Nom de la catégorie :
            <input type="text" value={newCategoryTitle} onChange={(e) => setNewCategoryTitle(e.target.value)} required />
          </label>

          <label>
            Couleur :
            <input type="color" value={newCategoryColor} onChange={(e) => setNewCategoryColor(e.target.value)} />
          </label>

          <button className="Ajouter" type="submit">Ajouter la catégorie</button>
        </form>
      </Modal>

      {/* Onglets en bas */}
      <div className="tabs">
        <button className={activeTab === "taches" ? "active" : ""} onClick={() => setActiveTab("taches")}>
          Tâches
        </button>
        <button className={activeTab === "categories" ? "active" : ""} onClick={() => setActiveTab("categories")}>
          Catégories
        </button>
      </div>
    </div>
  );
};

export default Footer;
