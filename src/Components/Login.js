export const Login = ({ handleChange, handleLogin, name }) => {
	return (
		<div className='center-div'>
			<div className='login-wrapper'>
				<input
					placeholder='Enter name'
					className='name'
					onChange={handleChange}
					value={name}
				/>
				<button className='btn-login' onClick={handleLogin}>
					Login
				</button>
			</div>
		</div>
	)
}
