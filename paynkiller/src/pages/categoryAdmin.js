import React from 'react'
import { Grid, Row, Col, Button, IconButton, Modal, Input } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, addCategory, editCategory, deleteCategory } from '../action'

const Category = () => {
    const [selectId, setSelectId] = React.useState(null)
    const [showModal, setShowModal] = React.useState({
        title: '',
        muncul: false,
        isi: '',
        id: null
    })
    const [modalDel, setModalDel] = React.useState({
        title: '',
        muncul: false,
        isi: '',
        id: null
    })

    const { categories } = useSelector((state) => {
        return {
            categories: state.categoryReducer.cate
        }
    })

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getCategory())
        // dispatch(username)
    }, [])

    const add = () => {
        setShowModal({
            title: 'add',
            muncul: true,
            isi: 'write here',
            id: null
        })
    }

    const save = () => {
        if (showModal.title === 'add') {
            console.log(showModal.isi)
            dispatch(addCategory(showModal.isi))
        } else if (showModal.title === 'edit') {
            console.log(showModal)
            dispatch(editCategory(showModal.isi, showModal.id))
        }

        setShowModal({
            title: '',
            muncul: false,
            isi: '',
            id: null
        })
    }

    const saveDel = () => {
        console.log(modalDel.id)
        dispatch(deleteCategory(modalDel.id))
        setModalDel({
            title: '',
            muncul: false,
            isi: '',
            id: null
        })
    }

    const edit = async (index) => {
        await setShowModal({
            title: 'edit',
            muncul: true,
            isi: categories[index].title,
            id: categories[index].id_category
        })
        setSelectId(categories[index].id_category)
        // console.log('params', categories[index].id_category)
        // console.log('selected', showModal)
        // console.log(categories[index].title)
    }

    const del = (index) => {
        setModalDel({
            title: 'delete',
            muncul: true,
            isi: `are you sure you want to delete '${categories[index].title}' ?`,
            id: categories[index].id_category
        })

        console.log(modalDel)
    }

    const close = () => {
        setShowModal({
            title: '',
            muncul: false,
            isi: '',
            id: null
        })
    }

    const closeDel = () => {
        setModalDel({
            title: '',
            muncul: false,
            isi: '',
            id: null
        })
    }

    const Render = () => {
        return (
            <div>
                {categories.map((item, index) => {
                    return (
                        <div style={styles.rows}>
                            <span>{item.title}</span>
                            <div>
                                <IconButton onClick={() => edit(index)} style={{ backgroundColor: 'white', marginTop: '-10px' }} icon={<span className="material-icons">create</span>}> edit</IconButton>
                                <IconButton onClick={() => del(index)} style={{ backgroundColor: 'white', marginTop: '-10px' }} icon={<span className="material-icons">delete</span>}> delete</IconButton>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }

    return (
        <Grid fluid>
            <Row>
                <Col md={4} style={{backgroundColor: 'yellow'}}>
                    <h1>ini drawer</h1>
                </Col>
                <Col md={14}>
                    <Row style={{margin: '30px -312px 0px' }} >
                    <Button onClick={add} style={{ float: 'right', height: '46px', backgroundColor: '#40e0d0', color: 'white', fontWeight: 'bold' }}>
                        add new category
                    </Button>
                    </Row>
                    <Row style={{ height: '80vh', justifyContent: 'center', marginLeft: '140px' }}>
                        <div style={styles.header}>
                            <span className="material-icons">list</span>
                            <span style={{ marginLeft: '10px' }}>Total Categories {categories.length}</span>
                        </div>
                        <Render />
                    </Row>

                </Col>
            </Row>
            <Modal show={showModal.muncul} onHide={close} style={{ width: '300px', justifySelf: 'center', position: 'fixed', top: '35%', left: '40%' }}>
                <Modal.Header>{showModal.title} category</Modal.Header>
                <Modal.Body>
                    <p>name</p>
                    <Input
                        value={showModal.isi}
                        onChange={value => setShowModal({ ...showModal, isi: value })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: '#40e0d0', color: 'white' }} onClick={save}>
                        save
                    </Button>
                    <Button variant="secondary" onClick={close}>
                        cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={modalDel.muncul} onHide={closeDel} style={{ width: '300px', justifySelf: 'center', position: 'fixed', top: '35%', left: '40%' }}>
                <Modal.Header>{modalDel.title} category</Modal.Header>
                <Modal.Body>
                    <p>{modalDel.isi}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={saveDel}>
                        yes
                    </Button>
                    <Button style={{ backgroundColor: '#40e0d0', color: 'white' }} onClick={closeDel}>
                        cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Grid>
    )

}

const styles = {
    header: {
        height: '56px',
        width: '910px',
        border: '1px solid  white',
        padding: '15px 15px 15px 15px',
        minHeight: '20px',
        backgroundColor: ' #F8F8F8',
        color: '#606060',
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: '22px',
        display: 'flex',
        flexDirection: 'row'
    },
    rows: {
        height: '56px',
        width: '910px',
        border: '2px solid #F8F8F8',
        padding: '15px 15px 15px 15px',
        minHeight: '20px',
        backgroundColor: 'white',
        color: '#606060',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '22px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}
export default Category