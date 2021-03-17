import React from 'react'
import Navbar from '../components/TopNavigation'
import '../css/pages/profile.css'
import { Button } from 'rsuite'
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
            <div id="containerProfile">
                <div id="profileBar">
                    <h1>This is Profile {username}</h1>
                    <Link to='/'>
                        <Button onClick={btnlogout} color='red' id="Button">LOGOUT</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen