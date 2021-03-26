import Axios from 'axios'

export const getAllCustomOrder = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/customorder/getall')

            dispatch({
                type: 'GET_CUSTOM_ORDER_ALL',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getCustomOrderDetail = (id_custom_order_detail) => {
    return async(dispatch) => {
        try{
            const res = await Axios.get(`http://localhost:2000/customorder/getcustomorderdetail/${id_custom_order_detail}`)

            dispatch({
                type: 'GET_CUSTOM_ORDER_DETAIL',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
            dispatch({ type: 'CUSTOM_ORDER_ERR', payload: err.response.data })
        }
    }
}

export const acceptCustomOrder = (id_custom_order) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/customorder/customorderacc/${id_custom_order}`)

            const res2 = await Axios.get('http://localhost:2000/customorder/getall')

            dispatch({
                type: 'GET_CUSTOM_ORDER_ALL',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
            dispatch({ type: 'CUSTOM_ORDER_ERR', payload: err.response.data })
        }
    }
}

export const rejectCustomOrder = (id_custom_order, data) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/customorder/customordernoacc/${id_custom_order}`, data)

            const res2 = await Axios.get('http://localhost:2000/customorder/getall')

            dispatch({
                type: 'GET_CUSTOM_ORDER_ALL',
                payload: res2.data
            })
        }
        catch(err){
            console.log(err)
            dispatch({ type: 'CUSTOM_ORDER_ERR', payload: err.response.data })        }
    }
}

export const addCustomOrderDetail = (idCustomOrder,body) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/customorder/addcustomorderdetail/${idCustomOrder}`, body)

            const res2 = await Axios.get(`http://localhost:2000/customorder/getcustomorderdetail/${idCustomOrder}`)

            dispatch({
                type: 'GET_CUSTOM_ORDER_DETAIL',
                payload: res2.data
            })

        }
        catch(err){
            console.log(err)
            dispatch({ type: 'CUSTOM_ORDER_ERR', payload: err.response.data })        
        }
    }
}

export const addCustomOrderToCart = (idCustomOrder,body) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/customorder/customordertocart/${idCustomOrder}`, body)

            const res2 = await Axios.get('http://localhost:2000/customorder/getall')

            dispatch({
                type: 'GET_CUSTOM_ORDER_ALL',
                payload: res2.data
            })

        }
        catch(err){
            console.log(err)
            dispatch({ type: 'CUSTOM_ORDER_ERR', payload: err.response.data })        
        }
    }
}

export const getMaterialsInCart = (id_customer) => {
    return async(dispatch) => {
        try{
            const res = await Axios.get(`http://localhost:2000/customorder/cartMaterials/${id_customer}`)

            dispatch({
                type: 'MATERIALS_CART',
                payload: res.data
            })

        }
        catch(err){
            console.log(err)   
        }
    }
}

export const getMaterialsCheckout = (id_customer) => {
    return async(dispatch) => {
        try {
            console.log('id di action', id_customer)
            const res = await Axios.get(`http://localhost:2000/customorder/checkoutMaterials/${id_customer}`)
            console.log(res.data)
            dispatch({
                type: 'MATERIALS_CHECKOUT',
                payload: res.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}