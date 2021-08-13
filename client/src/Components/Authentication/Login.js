import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setAuthMessage } from '../../redux/authSlice';
import { loadInterests } from '../../redux/interestsSlice';
import axios from 'axios';

export default function Login({ setShowingLogin }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const recentUserEmail = useSelector(state => state.auth.recentUserEmail);
    const authMessage = useSelector(state => state.auth.authMessage);
    const emailState = recentUserEmail;
    const [email, setEmail] = useState(emailState);
    const [password, setPassword] = useState(''); 

    const handleLogin = () => {
        const data = {
            username: email,
            password: password
        }

        axios({
            method: "POST",
            data: data,
            withCredentials: true,
            url: "http://localhost:4000/login"
          }).then((res) => {
            console.log(res);
            dispatch(setCurrentUser(res.data.username));
            dispatch(loadInterests(res.data.interests));
            dispatch(setAuthMessage(res.data.msg));
            if (res.data.msg === "Login Successful!") {
                history.push('/dashboard');
            }
          }).catch((err) => {
              console.log(err);
          }); 
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
                    {(authMessage) && <p>{authMessage}</p>}
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
