import React, { useState, useContext } from 'react'
import userContext from '../../utils/userContext';
import {useHistory} from 'react-router-dom';
import API from '../../utils/API'

export default ()=>{
	let history = useHistory();
	 const [loginState, setLoginState] = useState({
			username: '',
			password: '',
			email:'',
			login: 0
		})

		const {user, setUser} = useContext(userContext)

	const handleChange = event => {
		setLoginState({
			...loginState,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit= event => {
		console.log('sign-up handleSubmit, username: ')
		console.log(loginState.username)
		event.preventDefault()

		//request to server to add a new username/password
		API.loginSignup(loginState)
			.then(response => {
				console.log(response)
				response.err ? console.log(response.msg):
				setUser(response.data);
				history.push("/")
			}).catch(error => {
				console.log(error)
			})
	}

	return (
		<div className="SignupForm">
			<h4>{loginState.login ? 'Log In' : 'Sign up'}</h4>

			<button onClick={()=>setLoginState({...loginState, login: !loginState.login})}>
				{loginState.login ? 'New user? Sign up now!' : 'Already have an account? Log In!'}
			</button>
			<form className="form-horizontal">
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="username">Username</label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							value={loginState.username}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="password">Password: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="password"
							type="password"
							name="password"
							value={loginState.password}
							onChange={handleChange}
						/>
					</div>
				</div>
				{loginState.login ? "" : <div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="email">email: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="email"
							type="email"
							name="email"
							value={loginState.email}
							onChange={handleChange}
						/>
					</div>
				</div>}
				<div className="form-group ">
					<div className="col-7"></div>
					<button
						className="btn btn-primary col-1 col-mr-auto"
						onClick={(e)=>handleSubmit(e)}
						type="submit"
					>{loginState.login ? 'Log In': 'Sign up'}</button>
				</div>
			</form>
		</div>
	)
}
