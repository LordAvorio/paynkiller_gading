import React from 'react'

import SideNav from '../components/sideNavigation'
import {Row, Col, Container} from 'rsuite'

export default function Dashboard() {
    return (
        <div style={{backgroundColor: "#f4f3f3"}}>
            <Container style={{margin: "0px", padding: "0px"}}>
                <Row style={{margin: "0px", padding: "0px"}}>
                    <SideNav/>
                    <Col md={21}>
                        <h1>Test</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
