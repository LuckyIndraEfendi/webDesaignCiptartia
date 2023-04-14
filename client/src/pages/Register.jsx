import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineGooglePlus } from "react-icons/ai"
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
        <>
            <div className="background"></div>

            <div className="containerForm">
                <div className="textField">
                    <h1>Register</h1>
                </div>
                <form action="/" className='myForm' onSubmit={handleSubmit}>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Username' required onChange={(e) => setUser(e.target.value)} ref={nama} />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} ref={passwords} />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" placeholder='Retype Password' required onChange={(e) => setConfirmPassword(e.target.value)} ref={confrimPasswords} />
                    </div>
                    <button type='submit' className='submit'>Login</button>
                </form>
                <p className='smallInfo'>Don't have Account ? <Link to='/' style={{ color: "#1c0ee2", textDecoration: "none" }}>Sign Up</Link></p>

                {/* <h5 className="fastLogin">Login Fast With</h5> */}
                <div className="googleLogin" onClick={handleGoogleLogin}>
                    <AiOutlineGooglePlus size={30} />
                    <p>Sign in with Google</p>
                </div>
            </div>
        </>
    );
};

export default Register;
