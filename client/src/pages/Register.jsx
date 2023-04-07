import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import googleLogo from "../assets/icons/icon-google.png"
import facebook from "../assets/icons/fb.png"
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../config/firebase/firebaseConfig";
import swal from 'sweetalert';
function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confrimPassword, setConfirmPassword] = useState('')
    const nama = useRef()
    const passwords = useRef()
    const confrimPasswords = useRef()

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
        event.preventDefault();

        if (passwords.current.value !== confrimPasswords.current.value) {
            return swal("Oops", "Password Harus sama", "error")
        } else if (passwords.current.value.length < 6) {
            return swal("Oops", "Password Harus lebih dari 5 char", "error")
        }


        createUserWithEmailAndPassword(auth, user, password).then(ress => {
            navigate('/dashboard')
            localStorage.setItem('user', JSON.stringify(user))
            swal("Success", "Registrasi berhasil", "success")

        }).catch(err => {
            if (err.code == "auth/email-already-in-use") {
                return swal("Oops", "Email sudah terdaftar", "error")
            } else if (err.code == "auth/invalid-email") {
                return swal("Oops", "Email tidak valid", "error")
            } else if (err.code == "auth/network-request-failed") {
                return swal("Oops", "Terjadi Kesalahan Jaringan", "error")
            } else {
                return swal("Oops", "Terjadi Kesalahan. Silahkan Coba lagi nanti", "error")
            }
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
                            <label htmlFor="Username">Username <span>*</span></label>
                            <input type="text" className='formUserLogin' id='Username' onChange={(e) => setUser(e.target.value)} ref={nama} required />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password <span>*</span></label>
                            <input type="text" className='formUserLogin' required id='password' onChange={(e) => setPassword(e.target.value)} ref={passwords} />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Confirm Password <span>*</span></label>
                            <input type="text" className='formUserLogin' required id='password' onChange={(e) => setConfirmPassword(e.target.value)} ref={confrimPasswords} />
                        </div>
                        <button className='submitBtn'>Register</button>
                        <p style={{ fontFamily: 'system-ui' }}>Already have account? <Link to="/">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;