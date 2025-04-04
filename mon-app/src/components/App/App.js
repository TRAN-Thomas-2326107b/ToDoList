import React, { useState } from 'react';
import './App.css';
import todos from '../../todos.json';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ETATS } from '../../enums/etats';
import Filter from '../Filter/Filter';

function App() {
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [activeTab, setActiveTab] = useState("taches");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const [sortBy, setSortBy] = useState("date_creation");
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterEtat, setFilterEtat] = useState([]);
  const [filterUrgent, setFilterUrgent] = useState(null);
  const [filterFait, setFilterFait] = useState(null);

  const filteredAndSortedTasks = currentTodos.taches
  .filter(tache => {
    if (filterCategory.length > 0 && !filterCategory.includes("")) {
      const relation = currentTodos.relations.find(rela => rela.tache === tache.id);
      if (!relation || !filterCategory.includes(relation.categorie.toString())) {
        return false;
      }
    }

    if (filterEtat.length > 0) {
      if (!filterEtat.includes(tache.etat)) {
        return false;
      }
    } else if (tache.etat === "Reussi") {
      return false;
    }

    if (filterUrgent !== "" && filterUrgent !== null) {
      if ((filterUrgent === "true" && !tache.urgent) || (filterUrgent === "false" && tache.urgent)) {
        return false;
      }
    }

    if (filterFait !== "" && filterFait !== null) {
      const isDone = tache.etat === "Reussi";
      if ((filterFait === "true" && !isDone) || (filterFait === "false" && isDone)) {
        return false;
      }
    }

    return true;
  })
  .sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "date_creation") {
      return new Date(a.date_creation.split('/').reverse().join('-')) - new Date(b.date_creation.split('/').reverse().join('-'));
    }
    if (sortBy === "date_echeance") {
      return new Date(a.date_echeance.split('/').reverse().join('-')) - new Date(b.date_echeance.split('/').reverse().join('-'));
    }
    return 0;
  });

  const ajoutTache = (newTitle, newDescription, newDateEcheance, newEtat, newUrgent, categoryId) => {
    if (newTitle.length < 3) {
      alert("Le nom de la tâche doit contenir au moins 3 caractères.");
      return;
    }
    
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
    if (newCategoryTitle.length < 3) {
      alert("Le nom de la catégorie doit contenir au moins 3 caractères.");
      return;
    }
    
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

  const supprimerCategorie = (id) => {
    const newCategories = currentTodos.categories.filter((categorie) => categorie.id !== id);
  
    const newRelations = currentTodos.relations.filter((relation) => relation.categorie !== id);
  
    setCurrentTodos((prevTodos) => ({
      ...prevTodos,
      categories: newCategories,
      relations: newRelations,
    }));
  };
  

  const supprimerTache = (id) => {
    const newTodos = {
      ...currentTodos,
      taches: currentTodos.taches.filter((tache) => tache.id !== id),
    };
    setCurrentTodos(newTodos);
  };

  const modifierTache = (id, updatedData) => {
    setCurrentTodos((prevTodos) => ({
      ...prevTodos,
      taches: prevTodos.taches.map((tache) =>
        tache.id === id ? { ...tache, ...updatedData } : tache
      ),
    }));
  };

  const modifierCategorie = (id, updatedData) => {
    setCurrentTodos((prevTodos) => ({
      ...prevTodos,
      categories: prevTodos.categories.map((categorie) =>
        categorie.id === id ? { ...categorie, ...updatedData } : categorie
      ),
    }));
  };

  return (
    <div className="App">
      <header className='App-header'>
        <Header taches={currentTodos.taches} />
      </header>

      <main>
        <h2>{activeTab === "taches" ? "Liste des tâches" : "Liste des catégories"}</h2>

        {activeTab === "taches" && (
          <div>
            <Filter
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              filterEtat={filterEtat}
              setFilterEtat={setFilterEtat}
              filterUrgent={filterUrgent}
              setFilterUrgent={setFilterUrgent}
              filterFait={filterFait}
              setFilterFait={setFilterFait}
              currentTodos={currentTodos}
            />
            <div className="task-list">
              {filteredAndSortedTasks.map((tache) => {
                const relation = currentTodos.relations.find((rela) => rela.tache === tache.id);
                const category = currentTodos.categories.find((cate) => cate.id === relation?.categorie);

                return (
                  <div key={tache.id} className={`task ${tache.urgent ? "urgent" : ""} ${tache.etat === "Reussi" ? "reussi" : ""}`}>
                    <h3>{tache.title}</h3>
                    <p><strong>Description :</strong> {tache.description}</p>
                    <p><strong>Créée le :</strong> {tache.date_creation}</p>
                    <p><strong>Échéance :</strong> {tache.date_echeance}</p>
                    <p><strong>État :</strong> <span className={`etat ${tache.etat.replace(/\s+/g, '-').toLowerCase()}`}>{tache.etat}</span></p>
                    {category && <p><strong>Catégorie :</strong> <span style={{ color: category.color }}>{category.title}</span></p>}
                    <button className="supprimer-tache" onClick={() => supprimerTache(tache.id)}>✖</button>
                    <button className="modifier-tache" onClick={() => setTaskToEdit(tache)}>🖊</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="category-list">
            {currentTodos.categories.map((categorie) => (
              <div key={categorie.id} className="category" style={{ backgroundColor: categorie.color,borderLeft: `5px solid ${categorie.color}`}}>
                <h3>{categorie.title}</h3>
                <button className="modifier-categorie" onClick={() => setCategoryToEdit(categorie)}>🖊</button>
                <button className="supprimer-categorie" onClick={() => supprimerCategorie(categorie.id)}>✖</button>
              </div>
            ))}
          </div>
        )} 
      </main>

      <footer>
        <Footer
          ajoutTache={ajoutTache}
          ajoutCategorie={ajoutCategorie}
          modifierTache={modifierTache}
          modifierCategorie={modifierCategorie}
          categories={currentTodos.categories}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
          categoryToEdit={categoryToEdit}
          setCategoryToEdit={setCategoryToEdit}
        />
      </footer>
    </div>
  );
}

export default App;
