import Axios from 'axios'

export const getUserCart = (id_customer) => {
    return async (dispatch) => {
        try {
            console.log('id di action', id_customer)

            const res = await Axios.get(`http://localhost:2000/order/userCart/${id_customer}`)
            console.log(res.data)
            dispatch({ type: 'GET_CART', payload: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}
export const addCart = (id_customer) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(`http://localhost:2000/order/addCart/${id_customer}`)
            console.log(res.data)

            const res2 = await Axios.get(`http://localhost:2000/order/userCart/${id_customer}`)
            console.log(res2.data)
            dispatch({ type: 'GET_CART', payload: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const editCartQty = (body) => {
    return async (dispatch) => {
        try {
            console.log('tempproduk di action', body)
            const res = await Axios.patch(`http://localhost:2000/order/editQty/${body.id_produk}`, body)
            console.log(res.data)
            
            const res2 = await Axios.get(`http://localhost:2000/order/userCart/${body.id_customer}`)
            console.log(res2.data)
            dispatch({ type: 'GET_CART', payload: res2.data })
            
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const deleteCartItem = (body) => {
    return async (dispatch) => {
        try {
            // console.log('del di action', body.order_number)
            console.log('row delete', body)
            // let order = body.order_number
            // console.log({order})
            const res = await Axios.delete(`http://localhost:2000/order/delete/${body.id_details}`)
            console.log(res.data)

            const res2 = await Axios.get(`http://localhost:2000/order/userCart/${body.id_customer}`)
            // console.log(res2.data)
            dispatch({ type: 'GET_CART', payload: res2.data })
            
        }
        catch (err) {
            console.log(err)
        }
    }
}