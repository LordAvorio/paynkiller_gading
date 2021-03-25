import Axios from 'axios'

export const getAllOrder = () => {
    return async(dispatch) => {
        try{
            const res = await Axios.get('http://localhost:2000/order/getallorder')

            dispatch({
                type: 'GET_ORDER_ALL',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getOrderDetailSpecific = (orderNumber) => {
    return async(dispatch) => {
        try{
            const res = await Axios.post(`http://localhost:2000/order/getorderdetailspecific/${orderNumber}`)

            dispatch({
                type: 'GET_DATA_ORDER_DETAIL_SPECIFIC',
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}