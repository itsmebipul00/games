import { Bin, Edit } from '../icones'
export const Game = ({
	editGame,
	newGame,
	handleGameNameChange,
	handleEditSaveGame,
	handleCreateNewGame,
	games,
	handleDeleteItem,
	handleEditGame,
}) => {
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
