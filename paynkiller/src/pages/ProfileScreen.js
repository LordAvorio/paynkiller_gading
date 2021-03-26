import React, { useEffect } from 'react'
import Axios from 'axios'
import Navbar from '../components/TopNavigation'
import '../css/pages/profile.css'
import { Button, Avatar, Form, FormGroup, FormControl, ControlLabel,} from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'

import { logout, showProfile } from '../action'

import { Link } from 'react-router-dom'

const ProfileScreen = () => {
    const [editProfile, setEditProfile] = React.useState(false)
    const [formValue, setFormValue] = React.useState({
        firstname: '',
        lastname: '',
        alamat: '',
        phone: ''
    })

    const dispatch = useDispatch()
    const { id_customer, biodata } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer,
            biodata: state.userReducer.biodata
        }
    })

    React.useEffect(() => {
        dispatch(showProfile())
        console.log(biodata)
    }, [])

    const btnlogout = () => {
        dispatch(logout())

        localStorage.removeItem('token')
    }

    const handleSave = async () => {
        console.log(formValue)
        try {
            await Axios.patch(`http://localhost:2000/user/editProfile/${id_customer}`, formValue)
            setEditProfile(false)
            dispatch(showProfile())
        }
        catch (err) {
            console.log(err)
        }
    }

    const FormProfile = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{ flexGrow: 1 }}>
                    <Avatar>AB</Avatar>
                    <p style={{ fontSize: '14px' }}>username</p>
                    <h5 style={{ fontSize: '16 px' }}>{biodata.username}</h5>
                    <p style={{ fontSize: '14px' }}>email</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '20vw' }}>
                        <h5 style={{ fontSize: '16px' }}>{biodata.email}</h5>
                        <h5 style={{ fontSize: '12px' }}>status</h5>
                    </div>
                </div>
                <div style={{ backgroundColor: 'cornflowerblue', flexGrow: 2, maxWidth: '30vw' }}>
                    {editProfile === false
                        ?
                        <>
                            <h5 style={{ fontSize: '14px'}}>first name:</h5>
                            <h5 style={{ fontSize: '14px' }}> {biodata.firstname ? biodata.firstname : 'add now to personalize your account'}</h5>
                            <h5 style={{ fontSize: '14px',  marginTop:10  }}>last name:</h5>
                            <h5 style={{ fontSize: '14px'}}> {biodata.lastname ? biodata.lastname : 'add now to personalize your account'}</h5>
                            <h5 style={{ fontSize: '14px',  marginTop:10  }}>adrress: </h5>
                            <h5 style={{ fontSize: '14px' }}> {biodata.alamat ? biodata.alamat : 'add now to personalize your account'}</h5>
                            <h5 style={{ fontSize: '14px',  marginTop:10  }}>phone: </h5>
                            <h5 style={{ fontSize: '14px'}}> {biodata.phone ? biodata.phone : 'add now to personalize your account'}</h5>
                            <Button appearance="primary" onClick={() => setEditProfile(true)}>Edit</Button>
                        </>
                        :
                        <>
                            <Form
                            formValue={formValue}
                            onChange={value => setFormValue(value)}
                            >
                                <FormGroup>
                                    <ControlLabel>first name</ControlLabel>
                                    <FormControl name="firstname"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>last name</ControlLabel>
                                    <FormControl name="lastname" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>address</ControlLabel>
                                    <FormControl name="alamat" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>phone number</ControlLabel>
                                    <FormControl name="phone" />
                                </FormGroup>
                                <Button appearance="primary" onClick={handleSave}>Save</Button>
                            </Form>
                        </>
                    }
                </div>
            </div>
        )
    }


    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <div style={{ width: '20vw', height: '30vh', backgroundColor: 'burlywood' }}>
                    <h6>sidebar (profile dan history)</h6>
                </div>
                <div style={{ width: '65vw', height: '80vh', backgroundColor: 'cadetblue', padding: '20px 30px 20px 30px' }}>
                    <h1>Account Details</h1>
                    <h5>You can update your account anytime you like</h5>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'coral', borderRadius: '20px', flexGrow: 1  }}> */}
                    <FormProfile />
                    {/* </div> */}
                    <Link to='/'>
                        <Button onClick={btnlogout} color='red' id="Button">LOGOUT</Button>
                    </Link>
//                     <div style={{display:'flex', justifyContent: 'space-around'}}>
//                         <div style={{backgroundColor:'coral', borderRadius: '20px', flexGrow: 1}}>
//                             <Avatar>AB</Avatar>
//                             <p>username</p>
//                             <h5>isi username</h5>
//                             <p>email</p>
//                             <div style={{display:'flex', justifyContent: 'space-between', width:'15vw'}}>
//                             <h5>isi email</h5>
//                             <h5>status</h5>
//                             </div>
//                         </div>
//                         <div style={{backgroundColor:'cornflowerblue', flexGrow: 1}}>
//                             <h5>first name</h5>
//                             <h5>last name</h5>
//                             <h5>address</h5>
//                         </div>
//                     </div>
//             <Link to='/'>
//                 <Button onClick={btnlogout} color='red' id="Button">LOGOUT</Button>
//             </Link>
//             <Link to='/ShowCustomOrder'>
//                 <Button  style={{backgroundColor:'#04BF8A', color:'white', marginLeft:20}} id="Button">My Custom Order</Button>
//             </Link>
//             <Link to='/historyUser'>
//                 <Button  style={{backgroundColor:'#04BF8A', color:'white', marginLeft:20}} id="Button">My Orders</Button>
//             </Link>
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