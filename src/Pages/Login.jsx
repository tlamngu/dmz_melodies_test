// src/Login.js
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import Logo from '/src/assets/Logo.png'
import "./css/login.css"
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function handleLogin(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:8888/login',
            {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
        const data = await response.json();
        if (response.ok) {
            alert(`Logged in! Token: ${data.token}`);
            Cookies.set('token', data.token);
            Cookies.set('uid', data.uid);
            Cookies.set('isLoggedin', 'true');
            navigate('/');
        }
        else {
            alert(`Error: ${data.detail}`);
        }
        console.log('Logging in:', email);
    };

    return (
        <div className="form-container poppins">
            <div className="imgcont">
                <img src={Logo} alt="Logo" className="logo" />
            </div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className='TextInput'>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='TextInput'>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='loginButton' type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link className='Link' to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;
