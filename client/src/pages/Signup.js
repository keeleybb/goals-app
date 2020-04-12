import React, { useState } from 'react';
import API from '../utils/API';
// import { Button, FormGroup, FormControl } from 'react-bootstrap';
// const user = require ('../../../models/user');

export default function Users(props) {
    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [userInput, setUserInput] = useState({});
    console.log('Create an Account!')

    const handleInputChange = e => {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };

    // function validateForm() {
    //     return email.length > 0 && password.lengeth > 0;
    // }
    const handleFormSubmit = e => {
        e.preventDefault();
        if (userInput.email && userInput.password) {
            API.saveUsers(userInput)
                .then(res => {
                    console.log('res', res)
                    alert('You are now registered! Please login')
                    window.location.assign('/login')
                })
                .catch(e => {
                    console.log("error!", e);
                });
        }
    };
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     fetch('/signup',{ 
    //     method: "POST",
    //     body: JSON.stringify({})
    // })
    // }

    console.log(username)
    return (
        <div className="Login">
            <h1>Let's Get You Started!</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="username" onChange={handleInputChange} value={username} placeholder="Tell Me Your Name" ></input>
                <input type="email" name="email" onChange={handleInputChange} value={email} placeholder="Email" ></input>
                <input type="password" name="password" onChange={handleInputChange} value={password} placeholder="Password" ></input>
                <button>Log In</button>
            </form>
        </div>
    )
}