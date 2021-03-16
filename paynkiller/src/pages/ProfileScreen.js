import React from 'react'
import Navbar from '../components/TopNavigation'
import {Button} from 'rsuite'
import {useDispatch} from 'react-redux'
import { logout } from '../action'
import { Link } from 'react-router-dom'

const ProfileScreen = () => {
    const dispatch = useDispatch()
    const btnlogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
    }

    return(
        <div>
            <Navbar />
            <h1>This is Profile Screen</h1>
            <Link to='/'>
            <Button onClick={btnlogout}>LOGOUT</Button>
            </Link>
        </div>
    )
}

export default ProfileScreen