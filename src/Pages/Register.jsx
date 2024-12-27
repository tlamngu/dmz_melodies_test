import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/src/assets/Logo.png';
import "./css/register.css";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:8888/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert(`User registered with UID: ${data.uid}.`);
            navigate('/login');
        } else {
            alert(`Error: ${data.detail}`);
        }
        console.log('Registering:', username, email);


    };

    return (
        <div className="form-container poppins">
            <div className="imgcont">
                <img src={Logo} alt="Logo" className="logo" />
            </div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="TextInput">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="TextInput">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="TextInput">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link className="Link" to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
