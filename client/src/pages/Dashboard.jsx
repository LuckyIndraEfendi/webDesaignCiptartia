import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import swal from 'sweetalert';
import {GrLocation} from 'react-icons/gr';
import Video from '../assets/videos/video-utama.mp4'
import {SiInteractiondesignfoundation} from 'react-icons/si'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TbGridDots} from 'react-icons/tb'
import {BiLogIn} from 'react-icons/bi'
import {BsFillCalendar2EventFill} from 'react-icons/bs'

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


    const [active, setActive] = useState("navBar")
    // function to toogle navigation
    const showNav = () =>{
        setActive("navBar activeNavbar")
    }
    const removeNavbar = () =>{
        setActive("navBar")
    }

    return (
        <>
{/* Navbar */}

<section className='navBarSection'>
            <header className="header flex">
    
                <div className="logoDiv">
                    <a href="#" className='logo flex'>
                        <SiInteractiondesignfoundation className="icon"/>
                        {/* <h1>MyAnimeList</h1> */}
                    </a>
                </div>
    
            <div className={active}>
                <ul className="navLists flex">
                    <li className="navItem"><a href="#" className="navLink">Home</a></li>
                    <li className="navItem"><a href="#" className="navLink">About</a></li>
                    <li className="navItem"><a href="#" className="navLink">Blog/News</a></li>
                    <li className="navItem"><a href="#" className="navLink">Contact</a></li>
                    <li className="navItem"><a href="#" className="navLink">Services</a></li>
                
                <button className='btn flex' onClick={handleLogout}>
                    <a href="#">EVENTS</a>
                    <BsFillCalendar2EventFill className='icon-event'/>
                </button>


            </ul>

            <div onClick={removeNavbar} className="closeNavbar">
                <AiFillCloseCircle className='icon'/>
            </div>

            </div>

            <div onClick={showNav} className="toggleNavbar">
            <TbGridDots className='icon'/>
            </div>
            </header>
        </section>


{/* Dashboard */}
<section className='home'>
      <div className="overlay"></div>
        <video src={Video} muted autoPlay loop type="video/mp4"></video>

        <div className="homeContent container">
          <div className="textDiv">
            <span className="smallText">
            Spark a Culture of Creativity with Technology
            </span>
            <h1 className='homeTitle'>
            Build A Culture of Creativity And Efficiency By Using Technology
            </h1>
            <p>
            Welcome to the Spark a Culture of Creativity with Technology website!  We are a platform that is committed to spurring people's creativity by using technology.  We believe that technology can be a very effective means of driving creativity and innovation, and we want to help people reach their full potential through creativity.
            </p>

            <button type='button' className='btn-2'><a href="">Get Started</a></button>
          </div>
        </div>
    </section>
        </>
    );
};

export default Dashboard;