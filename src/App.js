import React, { useEffect, useState } from "react";
import api from "./services/api.js";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo repo ${Date.now()}`,
      url: `http://${Date.now()}`,
      techs: [`${Date.now()}`],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepo = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(newRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
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
  );
}

export default App;