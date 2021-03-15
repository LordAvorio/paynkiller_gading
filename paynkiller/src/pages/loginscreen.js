import React from 'react'

import {Grid, Row, Col, Button, IconButton, Icon, Form, InputGroup, Input} from 'rsuite'

import LoginImage from '../images/Resources/LoginImage.png'

import '../css/pages/login.css'

import {Link} from 'react-router-dom'


export default function Loginscreen() {
    return (
        <div id="containerLogin">
            <Grid fluid style={{padding: "0px"}}>
                <Row style={{margin: "0px"}}>
                    <Col md={8} style={{height: "100vh"}}>
                        <Row>
                            <Col md={24} style={{paddingTop: "20px", paddingLeft: "25px"}}>
                                <Link to='/'>
                                    <IconButton id="back-menu-button" icon={<Icon icon="angle-left" id="icon-menu-button"/>}>Back To Home</IconButton>                            
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} style={{padding: '50px 10px'}}>
                                <p style={{textAlign: 'center', fontSize: '40px', color: '#04BF8A', fontWeight: 'bold'}}>SIGN IN</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24} style={{padding: '0px 80px'}}>
                                <Form>
                                    <InputGroup style={{height: '45px'}}>
                                        <InputGroup.Addon style={{width: '40px', backgroundColor: '#04BF8A', color: 'white'}}>
                                            <Icon icon="avatar"/>
                                        </InputGroup.Addon>
                                        <Input type="text" placeholder="Username" style={{color: '#04BF8A'}}/>
                                    </InputGroup>
                                    <InputGroup style={{height: '45px', margin: '45px 0px', }}>
                                        <InputGroup.Addon style={{width: '40px', backgroundColor: '#04BF8A', color: 'white'}}>
                                            <Icon icon="unlock-alt"/>
                                        </InputGroup.Addon>
                                        <Input type="password" placeholder="Password" style={{color: '#04BF8A'}}/>
                                    </InputGroup>
                                </Form>
                            </Col>
                            <Col md={24} style={{padding: '0px 155px'}}>
                                <Button id="button-submit">Lets Go !</Button>                            
                            </Col>
                        </Row>
                    </Col>
                    <Col md={16} style={{height: "100vh", padding: "0px"}}>
                        <img
                        alt=""
                        src={LoginImage}
                        width="100%"
                        height="100%"
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}
