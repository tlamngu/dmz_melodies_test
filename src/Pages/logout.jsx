import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        Cookies.remove('token');
        Cookies.remove('uid');
        Cookies.set('isLoggedin', 'false');
        navigate('/login');
    }, [navigate]);

    return (
        <div>Logging out, please wait...</div>
    );
}

export default Logout;
