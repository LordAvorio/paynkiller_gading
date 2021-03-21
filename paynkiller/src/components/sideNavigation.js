import React from 'react'
import { Dropdown, Sidenav, Nav, Icon, Container, Sidebar, Col, Row} from 'rsuite'
import {Link} from 'react-router-dom'

export default function sideNavigation() {
  return (
    <div style={{backgroundColor: "#f4f3f3"}}>
      {/* <Col md={3} style={{padding: "0px", margin: "0px", position: "sticky", left: 0}}> */}
          <Sidenav style={{height: "100vh", width: "13.5%", position: "fixed"}}>
            <Sidenav.Header style={{backgroundColor: "#038C73", padding: "45px 5px"}}>
              <Row>
                <Col md={24}>
                 <p style={{color: "white", fontSize: "25px", textAlign: "center"}}>Hello, Ahmad</p>
                </Col>
              </Row>
            </Sidenav.Header>
            <Sidenav.Body style={{paddingTop: "15px"}}>
              <Nav>
                  <Link to="/admin/dashboard">
                    <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
                      Dashboard
                    </Nav.Item>
                  </Link>
                <Dropdown eventKey="2" title="Data Master" icon={<Icon icon="dropbox" />}>
                  <Link to="/admin/master/brand">
                    <Dropdown.Item eventKey="2-1">Brands</Dropdown.Item>
                  </Link>
                  <Link to="/admin/master/uom">
                    <Dropdown.Item eventKey="2-2">UOM</Dropdown.Item>
                  </Link>
                  <Link to="/admin/master/rawmaterial">
                    <Dropdown.Item eventKey="2-3">Raw Material</Dropdown.Item>
                  </Link>
                  <Link to="/admin/master/product">
                    <Dropdown.Item eventKey="2-4">Products</Dropdown.Item>
                  </Link>
                </Dropdown>
                <Dropdown eventKey="3" title="Management Stock" icon={<Icon icon="dropbox" />}>
                  <Link to="/admin/stock/product">
                    <Dropdown.Item eventKey="3-1">Stock Product</Dropdown.Item>
                  </Link>
                  <Link to="/admin/stock/rawmaterial">
                    <Dropdown.Item eventKey="3-2">Stock Raw Material</Dropdown.Item>
                  </Link>
                </Dropdown>
              </Nav>
          </Sidenav.Body>
        </Sidenav>
      {/* </Col> */}
    </div>
  )
}

