import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineGooglePlus } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase/firebaseConfig';
import { AiOutlineSearch } from "react-icons/ai"
import "./App.css"
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import swal from 'sweetalert';
function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const emails = useRef()
    const passwords = useRef()
    const navigate = useNavigate();


    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;
            const credential = await GoogleAuthProvider.credentialFromResult(result);
            const token = await credential.accessToken;
            localStorage.setItem('user', JSON.stringify(user))
            swal("Hore", "Login Berhasil", "success")
            navigate('/dashboard')

            console.log({ user, token });
        } catch (error) {
            console.log(error);
            swal("Oops", "Login Gagal", "error")
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        signInWithEmailAndPassword((auth), email, password).then((res) => {
            swal("Hore", "Login Berhasil", "success")
            navigate('/dashboard')
        }).catch((error) => {
            let Message;
            if (error.code == "auth/wrong-password") {
                Message = "Password Salah"
            } else if (error.code == "auth/user-not-found") {
                Message = "Akun dengan email tersebut tidak ditemukan."
            } else if (error.code == "auth/invalid-email") {
                Message = "Alamat email tidak valid."
            } else {
                Message = "Terjadi Kesalahan. Silahkan Coba lagi nanti"
            }
            swal("Oops", Message, "error")


        })
    }

    return (
        <>
            <div className="background"></div>

            <div className="containerForm">
                <div className="textField">
                    <h1>Login</h1>
                </div>
                <form action="/" className='myForm' onSubmit={handleSubmit}>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Username' required onChange={(e) => setEmail(e.target.value)} ref={emails} />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} ref={passwords} />
                    </div>

                    <button type='submit' className='submit'>Login</button>
                </form>
                <p className='smallInfo'>Don't have Account ? <Link to='/register' style={{ color: "#1c0ee2", textDecoration: "none" }}>Sign Up</Link></p>

                {/* <h5 className="fastLogin">Login Fast With</h5> */}
                <div className="googleLogin" onClick={handleGoogleLogin}>
                    <AiOutlineGooglePlus size={30} />
                    <p>Sign in with Google</p>
                </div>
            </div>
        </>
    );

}


export default Login;