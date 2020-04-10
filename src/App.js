import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[])
  

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Kayo Timoteo',
      url: 'https://github.com/kayotimoteo',
      techs: ["React", "NodeJS", "React Native"],
    })
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <>
    <div  className="geral">
      <div className="nav">
      <a href="https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs">Bootcamp GoStack - Desafio 02</a>
      </div>
      <div className="content">
        <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          ))}
        </ul>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
    </>
  );
}

export default App;
