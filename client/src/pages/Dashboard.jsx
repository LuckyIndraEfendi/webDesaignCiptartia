import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import swal from 'sweetalert';
const Dashboard = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])


    const handleLogout = () => {

        const auth = getAuth()
        signOut(auth).then(ress => {
            localStorage.clear()
            navigate('/')
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <img src={user ? user.photoURL : 'no user'} alt="" />
            <h1>{user ? user.email : 'no user'}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;