import './App.css'
import { useLocalStorage } from './Hooks/useLocalStorage'
import { useEffect, useState } from 'react'
import { Bin, Edit } from './icones'
import { nanoid } from 'nanoid'

function App() {
	const initialGameState = {
		author: 'Simple Viral Games',
		date: '2022-08-01 00:00:00',
		id: nanoid(),
		name: '',
		url: 'https://simpleviralgames.com/',
	}
	const [games, setGames] = useLocalStorage('games', undefined)
	const [newGame, setNewGame] = useState(initialGameState)
	const [editGame, setEditGame] = useState(false)

	const getGames = async () => {
		console.log('first')
		try {
			const res = await fetch('https://api.bipulsharma.repl.co/games')
			const data = await res.json()
			setGames(data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		if (!games) getGames()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleDeleteItem = id => {
		setGames(prev => prev.filter(game => game.id !== id))
	}

	const handleCreateNewGame = () => {
		if (newGame.name.trim().length === 0) return
		setGames(prev => [...prev, newGame])
		setNewGame(initialGameState)
	}

	const handleGameNameChange = e => {
		setNewGame(prev => {
			return {
				...prev,
				name: e.target.value,
			}
		})
	}

	const handleEditGame = id => {
		const gameToEdit = games.find(game => game.id === id)
		setNewGame(gameToEdit)
		setEditGame(true)
	}

	const handleEditSaveGame = () => {
		if (newGame.name.trim().length === 0) return
		setGames(prev =>
			prev.map(game => (game.id === newGame.id ? newGame : game))
		)
		setNewGame(initialGameState)
		setEditGame(false)
	}

	return (
		<div className='p-xl'>
			<label htmlFor='game' className='font-xl'>
				{editGame ? 'Edit Game' : 'Create Game'} :{'  '}
			</label>
			<input
				id='game'
				name='game'
				placeholder='Enter game'
				value={newGame.name}
				onChange={handleGameNameChange}
				className='font-xl'
			/>
			<button
				onClick={editGame ? handleEditSaveGame : handleCreateNewGame}
				className='pointer font-xl'>
				{editGame ? 'Save' : 'Create'}
			</button>
			<h2>All Games</h2>
			<div className='games'>
				{games?.map(game => (
					<div key={game.id} className='game'>
						<h3>{game.name}</h3>
						<Bin onClick={() => handleDeleteItem(game.id)} />
						<Edit onClick={() => handleEditGame(game.id)} />
					</div>
				))}
			</div>
		</div>
	)
}

export default App
