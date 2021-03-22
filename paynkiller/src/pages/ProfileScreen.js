import React from 'react'
import Navbar from '../components/TopNavigation'
import '../css/pages/profile.css'
import { Button, Avatar } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../action'

import { Link } from 'react-router-dom'

const ProfileScreen = () => {
    const dispatch = useDispatch()
    const btnlogout = () => {
        dispatch(logout())

        localStorage.removeItem('token')
    }

    const { username } = useSelector((state) => {
        return {
            username: state.userReducer.username
        }
    })

    return (
        <div>
            <Navbar />
            <div style={{display: 'flex', marginTop:20, flexDirection:'row', justifyContent: 'space-evenly'}}>
                <div style={{width:'20vw', height: '30vh', backgroundColor:'burlywood'}}>
                    <h6>sidebar (profile dan history)</h6>
                </div>
                <div style={{width:'65vw', height: '80vh', backgroundColor:'cadetblue', padding: '20px 30px 20px 30px'}}>
                    <h1>Account Details</h1>
                    <h5>You can update your account anytime you like</h5>
                    <div style={{display:'flex', justifyContent: 'space-around'}}>
                        <div style={{backgroundColor:'coral', borderRadius: '20px', flexGrow: 1}}>
                            <Avatar>AB</Avatar>
                            <p>username</p>
                            <h5>isi username</h5>
                            <p>email</p>
                            <div style={{display:'flex', justifyContent: 'space-between', width:'15vw'}}>
                            <h5>isi email</h5>
                            <h5>status</h5>
                            </div>
                        </div>
                        <div style={{backgroundColor:'cornflowerblue', flexGrow: 1}}>
                            <h5>first name</h5>
                            <h5>last name</h5>
                            <h5>address</h5>
                        </div>
                    </div>
            <Link to='/'>
                <Button onClick={btnlogout} color='red' id="Button">LOGOUT</Button>
            </Link>
                </div>
            </div>
            {/* <div id="containerProfile">
                <div id="cardKiri"></div>
                <div id="profileBar">
                    <h1>This is Profile {username}</h1>
                </div>
            </div> */}
        </div>
    )
}

export default ProfileScreen