import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthorized, setCurrentUser } from '../../redux/authSlice';
import axios from 'axios';

export default function Login({ setShowingLogin }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const recentUserEmail = useSelector(state => state.auth.recentUserEmail);
    const emailState = recentUserEmail;
    const [email, setEmail] = useState(emailState);
    const [password, setPassword] = useState(''); 

    // if (recentUserEmail) {
    //     setEmail(recentUserEmail);
    // }

    const handleLogin = async () => {
        const data = {
            username: email,
            password: password
        }
        try {
            let response = await axios.post('http://localhost:4000/auth/login', data);
            let currentUserData = await response.data;
            console.log(currentUserData);
            dispatch(setAuthorized(true));
            dispatch(setCurrentUser(currentUserData));
            history.push('/');
        } catch (err) {
            console.log(err)
        }    
    }

    return (
        <div>
           <h1>Login</h1>

                <div>
                    <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required />
                </div>
                <div>
                    <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required />
                </div>
                <div>
                    <button onClick={() => handleLogin()} >Login</button>
                </div>
            <div>
                <p>New Here? <span className="authLink" onClick={() => {setShowingLogin(false)}}>Register Now!</span></p>
            </div>
        </div>  
    );
}
