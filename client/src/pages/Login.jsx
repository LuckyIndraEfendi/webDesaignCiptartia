import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import googleLogo from "../assets/icons/icon-google.png"
import facebook from "../assets/icons/fb.png"
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase/firebaseConfig';
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
        <div className='background'>
            <h1 className='text-signIn'>Sign In With</h1>
            <div className="container">
                <div className="containerForm">
                    <div className="btnGrup">
                        <button className='googleBtn'><img src={facebook} alt="" width='30px' /> <span>FaceBook</span></button>
                        <button className='googleBtn' onClick={handleGoogleLogin}><img src={googleLogo} alt="" /> <span>Google</span></button>
                    </div>
                    <form className="formGrupLogin" onSubmit={handleSubmit}>
                        <div className="username">
                            <label htmlFor="Username">Email <span>*</span></label>
                            <input type="email" className='formUserLogin' id='Username' onChange={(e) => setEmail(e.target.value)} ref={emails} required />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password <span>*</span></label>
                            <input type="text" className='formUserLogin' required id='password' onChange={(e) => setPassword(e.target.value)} ref={passwords} />
                        </div>
                        <button className='submitBtn'>Sign In</button>
                        <p style={{ fontFamily: 'system-ui' }}>Don't have account? <Link to="/register">Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;