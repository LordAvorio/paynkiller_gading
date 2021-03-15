import React from 'react'
import { Navbar, Nav, Icon, Dropdown } from 'rsuite'

import logoNavbar from '../images/logo/PaynKiller.svg'

import {Redirect, Link} from 'react-router-dom'


export default function TopNavigation() {
    return (
        <div>
            <Navbar style={{padding: '15px 50px'}}>
                <Navbar.Header style={{ paddingRight: '50px'}}>
                    <img
                        alt=""
                        src={logoNavbar}
                        width=""
                        height="100%"
                    />
                </Navbar.Header>
                <Navbar.Body>
                    <Nav>
                        <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
                        <Link to='/login'>
                            <Nav.Item>Login</Nav.Item>
                        </Link>
                    </Nav>
                    <Nav pullRight>
                        <Nav.Item icon={<Icon icon="cog" />} >Settings</Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        </div>
    )
}