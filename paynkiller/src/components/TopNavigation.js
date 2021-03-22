import React from 'react'
import { Navbar, Nav, Icon, Dropdown } from 'rsuite'

import logoNavbar from '../images/logo/PaynKiller.svg'

import { Redirect, Link } from 'react-router-dom'

import { useSelector } from 'react-redux'



export default function TopNavigation() {

    const { usernameCust } = useSelector((state) => {
        return {
            usernameCust: state.userReducer.username,
        }
    })

    return (
        <div>
            <Navbar style={{ padding: '15px 50px' }}>
                <Navbar.Header style={{ paddingRight: '50px' }}>
                    <img
                        alt=""
                        src={logoNavbar}
                        width=""
                        height="100%"
                    />
                </Navbar.Header>
                <Navbar.Body>
                    <Nav>
                        {
                            usernameCust
                                ?
                                <>
                                    <Link to='/'>
                                        <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
                                    </Link>
                                    <Link to='/profile'>
                                        <Nav.Item>Profile</Nav.Item>
                                    </Link>
                                </>
                                :
                                <>
                                    <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
                                    <Link to='/login'>
                                        <Nav.Item>Login</Nav.Item>
                                    </Link>
                                </>
                        }
                    </Nav>
                    <Nav pullRight>
                        <Nav.Item icon={<Icon icon="cog" />} >Settings</Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        </div>
    )
}
