import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRecentUserEmail, setAuthMessage } from '../../redux/authSlice';

import axios from 'axios';

export default function Register({ setShowingLogin }) {
    const dispatch = useDispatch();
    const authMessage = useSelector(state => state.auth.authMessage);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = () => {
        axios({
            method: "POST",
            data: {
              username,
              password
            },
            withCredentials: true,
            url: "http://localhost:4000/auth/register"
          }).then((res) => {
            console.log(res.data);
            dispatch(setRecentUserEmail(res.data.email));
            dispatch(setAuthMessage(res.data.msg));
            if (res.data.msg === "New User Created!") {
                setShowingLogin(true);
            }
        });
    }

    return (
    <div>
        <h1>Register</h1>
        <div>
            <input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Email" required />
        </div>
        <div>
            <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" id="registerPassword" name="registerPassword" required />
        </div>
        <div>
            {(authMessage) && <p>{authMessage}</p>}
        </div>
        <div>
            <button onClick={register} >Register</button>
        </div>
        <p>Already Registered? <span className="authLink" onClick={() => setShowingLogin(true)}>Sign In!</span></p>
    </div>  
    )
}
