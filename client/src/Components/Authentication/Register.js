import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRecentUserEmail } from '../../redux/authSlice';

import axios from 'axios';

export default function Register({ setShowingLogin }) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        const data = {
            username,
            email,
            password
        }
        try {
            let response = await axios.post('http://localhost:4000/auth/register', data);
            console.log(response);
            let newUserEmail = await response.data.email;
            dispatch(setRecentUserEmail(newUserEmail));
            setShowingLogin(true);
        } catch (err) {
            console.log(err);
        }   
    }

    return (
    <div>
        <h1>Register</h1>
        <div>
            <input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" id="registerUsername" name="registerUsername" required />
        </div>
        <div>
            <input type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" id="registerEmail" name="registerEmail" required />
        </div>
        <div>
            <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" id="registerPassword" name="registerPassword" required />
        </div>
        <div>
            <button onClick={register} >Register</button>
        </div>
        <p>Already Registered? <span className="authLink" onClick={() => setShowingLogin(true)}>Sign In!</span></p>
    </div>  
    )
}
