import Axios from 'axios'

export const getUserCart = (id_customer) => {
    return async (dispatch) => {
        try {
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