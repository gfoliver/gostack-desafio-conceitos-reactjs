import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
	const [repositories, setRepositories] = useState([])

	async function handleAddRepository() {
		const response = await api.post('/repositories', {
			title: 'Repositório de Teste'
		})

		setRepositories([...repositories, response.data])
	}

	async function handleRemoveRepository(id) {
		await api.delete('/repositories/' + id)
		setRepositories(repositories.filter(item => item.id !== id))
	}

	useEffect(() => {
		api.get('/repositories').then(response => {
			setRepositories(response.data)
		})
	}, [])

	return (
		<div className="App">
			<h1>Repositórios</h1>
			<ul data-testid="repository-list">
				{repositories.map(repo => (
					<li key={repo.id}>
						{repo.title}
						<button onClick={() => handleRemoveRepository(repo.id)}>
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
