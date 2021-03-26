import React from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Panel, IconButton, Button, Input, InputGroup, Alert } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart, editCartQty, deleteCartItem, keeplogin } from '../action'
import Navbar from '../components/TopNavigation'

const URL_IMG = 'http://localhost:2000/'

const CartScreen = () => {
    const [toCheckout, setToCheckout] = React.useState(false)

    const { id_customer, cart } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer,
            cart: state.cartReducer.cart
        }
    })

    const dispatch = useDispatch()

    React.useEffect(() => {
        console.log('id', id_customer)
        dispatch(getUserCart(id_customer))
        console.log(cart)
    }, [id_customer, cart.length])

    const del = async (index) => {
        dispatch(deleteCartItem(cart[index], () => {
            dispatch(keeplogin())
        }
        ))
    }

    const minus = async (id, index) => {
        if (cart[index].qty > 1) {
            const tempProduk = cart.find(e => e.id_details == id && (e.qty = e.qty - 1, true) && (e.total_harga = e.qty * e.harga_produk, true))
            console.log('minus', tempProduk)
            await dispatch(editCartQty(tempProduk, id_customer))
        }

    }

    const plus = async (id, index) => {
        if (cart[index].qty < cart[index].stock) {
            const tempProduk = cart.find(e => e.id_details === id && (e.qty = parseInt(e.qty) + 1, true) && (e.total_harga = e.qty * e.harga_produk, true))
            console.log('plus', tempProduk)

            await dispatch(editCartQty(tempProduk, id_customer))
        } else {
            Alert.error(`there are only ${cart[index].stock + ' ' + cart[index].nama_produk} available`, 5000)
        }
    }

    const grandTotal = () => {
        console.log(cart)
        let counter = 0
        if (cart.length !== 0) {
            cart.forEach(item => counter += item.total_harga)
        }
        return counter
    }

    const continueCheckout = async () => {
        try {
            let grandTotal = 0
            if (cart.length !== 0) {
                cart.forEach(item => grandTotal += item.total_harga)
            }
            const body = {
                grandTotal,
                order_number: cart[0].order_number
            }
            console.log(body)

            await Axios.patch(`http://localhost:2000/order/toCheckout`, body)
            setToCheckout(true)
        }
        catch (err) {
            console.log(err)
        }

    }

    if (toCheckout) return <Redirect to="/checkout" />
    const Render = () => {
        return (
            cart.map((item, index) => {
                return (
                    <div key={index} style={{ backgroundColor: 'white', height: '160px', width: '650px', border: '1px solid gray', margin: '10px 0 0 10px', display: 'flex', flexDirection: 'row', borderRadius: '20px' }}>
                        <div style={{ flexGrow: 3, width: '40vw', padding: '40px 0 0 30px', display: 'flex', flexDirection: 'row' }}>
                            <img src={URL_IMG + item.gambar_obat} style={{ height: '80px', width: '100px' }} />
                            <div>
                                <h1 style={{ fontSize: '15px', fontWeight: 600, margin: '-15px 0 0 20px', lineHeight: '2' }}>{item.nama_produk}</h1>
                                <h1 style={{ fontSize: '15px', fontWeight: 600, margin: '15px 0 0 20px' }}>Rp {item.harga_produk.toLocaleString()}</h1>
                            </div>
                        </div>
                        <div style={{ flexGrow: 3, width: '30vw', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flexGrow: 10 }}>

                            </div>
                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <div>
                                    <span style={{ borderLeft: '1px solid gray', height: '25px', alignSelf: 'center', margin: 0 }}></span>
                                    <Button onClick={() => del(index)} style={{ backgroundColor: 'white', margin: '5px', position: 'initial', color: '#d3d3d3' }}><span color='gray' className="material-icons">delete</span></Button>
                                </div>
                                <InputGroup style={{ height: '30px', width: '160px', margin: '10px 0 0 20px' }}>
                                    <InputGroup.Button style={{ color: '#51bea5' }} disabled={item.qty === 1} onClick={() => minus(item.id_details, index)}>
                                        <span className="material-icons">remove</span>
                                    </InputGroup.Button>
                                    <Input
                                        type="number"
                                        style={{ color: 'black', textAlign: 'center', fontWeight: '400' }}
                                        defaultValue={item.qty}
                                        disabled={true}
                                    // onChange={e => change(e)}
                                    />
                                    <InputGroup.Button style={{ color: '#51bea5' }} disabled={item.qty >= item.stock} onClick={() => plus(item.id_details, index)}>
                                        <span className="material-icons">add</span>
                                    </InputGroup.Button>
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
                            <p style={{ fontSize: '18px', textAlign: 'center' }}>Rp {grandTotal().toLocaleString('id-ID')}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                            <p style={{ fontSize: '16px', marginTop: '10px' }}>Shipping</p>
                            <p style={{ fontSize: '16px', textAlign: 'center', color: '#51bea5', fontWeight: 'bold' }}>ALWAYS FREE</p>
                        </div>
                        <div style={{ borderBottom: '4px solid gray', marginTop: '30px' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', fontWeight: 'bold', fontSize: '18px', }}>
                            <p style={{ marginTop: '10px' }}>Grand Total</p>
                            <p style={{ textAlign: 'center' }}>Rp {grandTotal().toLocaleString('id-ID')}</p>
                        </div>
                        <Button onClick={continueCheckout} style={{ width: '100%', backgroundColor: '#51bea5', color: 'white', fontWeight: 'bold', marginTop: '10px' }}>Continue</Button>

                    </Panel>
                </div>
            </div>
        </div>
    )

}
export default CartScreen