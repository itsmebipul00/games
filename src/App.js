import './App.css'
import { useLocalStorage } from './Hooks/useLocalStorage'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { Game } from './Components/Game'
import { Login } from './Components/Login'

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
	const [screen, setScreen] = useState('login')
	const [name, setName] = useState('')

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

	const handleChange = e => {
		setName(e.target.value)
	}

	const handleLogin = () => {
		if (name.trim().length > 0) {
			setScreen('game')
		}
	}

	const allScreens = {
		game: (
			<Game
				editGame={editGame}
				newGame={newGame}
				handleGameNameChange={handleGameNameChange}
				handleEditSaveGame={handleEditSaveGame}
				handleCreateNewGame={handleCreateNewGame}
				games={games}
				handleDeleteItem={handleDeleteItem}
				handleEditGame={handleEditGame}
			/>
		),
		login: (
			<Login
				handleChange={handleChange}
				handleLogin={handleLogin}
				name={name}
			/>
		),
	}

	return allScreens[screen]
}

export default App
