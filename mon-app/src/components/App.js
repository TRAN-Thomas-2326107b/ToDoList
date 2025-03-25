import React, { useState } from 'react';
import '../css/App.css';
import todos from '../todos.json';
import Header from './Header';
import Footer from './Footer';
import { ETATS } from '../enums/etats';

function App() {
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [activeTab, setActiveTab] = useState("taches"); // onglet actif, "taches" ou "categories"

  const ajoutTache = (newTitle, newDescription, newDateEcheance, newEtat, newUrgent, categoryId) => {
    const newTache = {
      id: currentTodos.taches.length + 101,
      title: newTitle,
      description: newDescription,
      date_creation: new Date().toLocaleDateString('fr-FR'),
      date_echeance: newDateEcheance,
      etat: ETATS[newEtat] || ETATS.NOUVEAU,
      urgent: newUrgent,
    };

    const newTodos = {
      ...currentTodos,
      taches: [...currentTodos.taches, newTache],
    };

    setCurrentTodos(newTodos);

    if (categoryId) {
      const newRelation = {
        tache: newTache.id,
        categorie: parseInt(categoryId),
      };

      setCurrentTodos((prevTodos) => ({
        ...prevTodos,
        relations: [...prevTodos.relations, newRelation],
      }));
    }
  };

  const ajoutCategorie = (newCategoryTitle, newCategoryColor) => {
    const newCategory = {
      id: currentTodos.categories.length + 201,
      title: newCategoryTitle,
      color: newCategoryColor,
      icon: "",
      actif: true,
    };

    setCurrentTodos((prevTodos) => ({
      ...prevTodos,
      categories: [...prevTodos.categories, newCategory],
    }));
  };

  const supprimerTache = (id) => {
    const newTodos = {
      ...currentTodos,
      taches: currentTodos.taches.filter((tache) => tache.id !== id),
    };
    setCurrentTodos(newTodos);
  };

  return (
    <div className="App">
      <header className='App-header'>
        <Header taches={currentTodos.taches} />
      </header>

      <main>
        <h2>{activeTab === "taches" ? "Liste des tâches" : "Liste des catégories"}</h2>
        {activeTab === "taches" ? (
          <div className="task-list">
            {currentTodos.taches.map((tache) => {
              const relation = currentTodos.relations.find((rela) => rela.tache === tache.id);
              const category = currentTodos.categories.find((cate) => cate.id === relation?.categorie);

              return (
                <div key={tache.id} className={`task ${tache.urgent ? "urgent" : ""}`}>
                  <h3>{tache.title}</h3>
                  <p><strong>Description :</strong> {tache.description}</p>
                  <p><strong>Créée le :</strong> {tache.date_creation}</p>
                  <p><strong>Échéance :</strong> {tache.date_echeance}</p>
                  <p><strong>État :</strong> <span className={`etat ${tache.etat.replace(/\s+/g, '-').toLowerCase()}`}>{tache.etat}</span></p>
                  {category && <p><strong>Catégorie :</strong> <span style={{ color: category.color }}>{category.title}</span></p>}
                  <button className="supprimer-tache" onClick={() => supprimerTache(tache.id)}>✖</button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="category-list">
            {currentTodos.categories.map((categorie) => (
              <div key={categorie.id} className="category" style={{ borderLeft: `5px solid ${categorie.color}` }}>
                <h3>{categorie.title}</h3>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        <Footer
          ajoutTache={ajoutTache}
          ajoutCategorie={ajoutCategorie}
          categories={currentTodos.categories}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </footer>
    </div>
  );
}

export default App;
