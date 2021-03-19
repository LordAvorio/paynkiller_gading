import React from 'react'
import { Panel, IconButton, Button, Input, InputGroup } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart } from '../action'
import Navbar from '../components/TopNavigation'
import { blueGrey } from '@material-ui/core/colors'

const CartScreen = () => {
    const [grandTotal, setgrandTotal] = React.useState(null)
    const { id_customer, cart } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer,
            cart: state.cartReducer.cart
        }
    })

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getUserCart(id_customer))
        let counter = 0
        cart.map(item => counter += item.total_harga)
        setgrandTotal(counter)
        console.log(grandTotal)

    }, [id_customer])

    const Render = () => {
        return (
            cart.map((item, index) => {
                return (
                    <div style={{ backgroundColor: 'white', height: '160px', width: '650px', border: '1px solid gray', margin: '10px 0 0 10px', display: 'flex', flexDirection: 'row', borderRadius: '20px' }}>
                        <div style={{ flexGrow: 3, maxWidth: '30vw', padding: '40px 0 0 30px', display: 'flex', flexDirection: 'row' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Pills_and_medicines_02.jpg" style={{ height: '80px', width: '100px' }} />
                            <div>
                                <h1 style={{ fontSize: '15px', fontWeight: 600, margin: '-15px 0 0 20px' }}>{item.nama_produk}</h1>
                                <h1 style={{ fontSize: '15px', fontWeight: 600, margin: '-35px 0 0 20px' }}>Rp {item.harga_produk.toLocaleString()}</h1>
                            </div>
                        </div>
                        <div style={{ flexGrow: 3, maxWidth: '40vw', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flexGrow: 10 }}>

                            </div>
                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <div>
                                    <span style={{ borderLeft: '1px solid gray', height: '25px', alignSelf: 'center', margin: 0 }}></span>
                                    <Button style={{ backgroundColor: 'white', margin: '5px', position: 'initial' }}><span color='gray' class="material-icons">delete</span></Button>
                                </div>

                                <InputGroup style={{ height: '30px', width: '130px', margin: '10px 0 0 20px' }}>
                                    <InputGroup.Addon>
                                        <span className="material-icons">remove</span>
                                    </InputGroup.Addon>
                                    <Input
                                        type="text"
                                        placeholder="Username"
                                        style={{ color: '#2d5a7e' }}
                                        value={item.qty}
                                    // onChange={username => setUsername(username)}
                                    />
                                    <InputGroup.Addon>
                                        <span className="material-icons">add</span>
                                    </InputGroup.Addon>
                                </InputGroup>
                            </div>
                        </div>
                    </div>

                )
            })
        )
    }

    return (
        <div>
            <Navbar />
            <h1 style={{ margin: '17px 40px', fontSize: '34px' }}>Your Cart</h1>
            <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
                <div style={{ borderTop: '4px solid #51bea5', flexGrow: 2, padding: '30px 0 0 40px', maxWidth: '65vw' }}>
                    <Render />
                </div>
                <div style={{ flexGrow: 1, position: 'relative' }}>
                    <Panel header="Shopping" shaded={true} style={{ backgroundColor: 'white', height: '305px', width: '280px', position: 'fixed', margin: '50px 0 0 40px', border: '2px solid #4f79c5', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '16px', marginTop: '10px' }}>Total Price</p>
                            <p style={{ fontSize: '18px', textAlign: 'center' }}>Rp {grandTotal.toLocaleString()}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                            <p style={{ fontSize: '16px', marginTop: '10px' }}>Shipping</p>
                            <p style={{ fontSize: '16px', textAlign: 'center', color:'#51bea5', fontWeight: 'bold' }}>ALWAYS FREE</p>
                        </div>
                        <div style={{borderBottom: '4px solid gray', marginTop: '30px'}}></div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', fontWeight: 'bold',  fontSize: '20px', }}>
                            <p style={{ marginTop: '10px' }}>Grand Total</p>
                            <p style={{ textAlign: 'center' }}>Rp {grandTotal.toLocaleString()}</p>
                        </div>
                        <Button style={{ width: '100%', backgroundColor: '#51bea5', color: 'white', fontWeight: 'bold', marginTop: '10px' }}>Continue</Button>

                    </Panel>
                </div>
            </div>
        </div>
    )

}
export default CartScreen