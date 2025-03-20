import React, {useState} from 'react';
import '../css/App.css';
import todos from '../todos.json'
import Header from './Header';
import Footer from './Footer';
import { ETATS } from '../enums/etats';


function App() {
  const [currentTodos, setCurrentTodos] = useState(todos);


  const ajoutTache = (newTitle, newDescription, newDateEcheance, newEtat, newUrgent) => {
    const newTache = {
      id: currentTodos.taches.length + 101,
      title: newTitle,
      description: newDescription,
      date_creation: new Date().toLocaleDateString(),
      date_echeance: newDateEcheance,
      etat: newEtat,
      urgent: newUrgent,
    };

    const newTodos = {
      ...currentTodos,
      taches: [...currentTodos.taches, newTache],
    };

  
    setCurrentTodos(newTodos);

    };


  return (
    <div className="App">
        <header className='App-header'>
          <Header taches = {todos.taches} />
        </header>
       
        <main>
        <h2>Liste des tâches</h2>
          <div className="task-list">
            {currentTodos.taches.map((tache) => (
              <div key={tache.id} className={`task ${tache.urgent ? "urgent" : ""}`}>
                <h3>{tache.title}</h3>
                <p><strong>Description :</strong> {tache.description}</p>
                <p><strong>Créée le :</strong> {tache.date_creation}</p>
                <p><strong>Échéance :</strong> {tache.date_echeance}</p>
                <p><strong>État :</strong> <span className={`etat ${tache.etat.toLowerCase()}`}>{tache.etat}</span></p>
              </div>
            ))}
          </div>
        </main>
        
        
      


        <footer>
          <Footer ajoutTache={ajoutTache}/>
        </footer>
    </div>

  );
}

export default App;
