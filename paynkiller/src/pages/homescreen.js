import React, {useState} from 'react'

import Navbar from '../components/TopNavigation'

import {Button, Modal} from 'rsuite'

export default function Homescreen() {

    const[showModal,setShowModal] = useState(false)

    return (
        <div style={{height: '5000'}}>
            <Navbar/>
            <h1>Home Screen</h1>
            <Button appearance="ghost" onClick={() => setShowModal(true)}>Test</Button>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)} appearance="primary">
                    Ok
                    </Button>
                    <Button onClick={() => setShowModal(false)} appearance="subtle">
                    Cancel
                    </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}
