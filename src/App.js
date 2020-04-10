import React, {useState, useEffect} from "react";
import api from  './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('/repositories').then(response=>{
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    //setRepositories([...repositories, 'Teste'])
    const response = await api.post('/repositories',{
      title: Date.now(),
      url : "https://github.com/tonoliveira96/gostack11-desafio02",
      techs : "NodeJS",
      likes:0
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
     await api.delete(`/repositories/${id}`)

    const index = repositories.findIndex(repo=> repo.id === id);

    repositories.splice(index, 1)

    console.log(repositories)
    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
       {
         repositories.map(repo=>
          <li key={repo.id}> 
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )
       }                
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
