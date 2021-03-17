import Axios from 'axios'

export const getCategory = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get('http://localhost:2000/category/getAll')
            console.log(res.data)
            dispatch({type: 'GET_CATEGORY', payload: res.data})
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const addCategory = (isi) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('http://localhost:2000/category/add', {isi})
            console.log({isi})
            console.log(res.data)
            dispatch({type: 'GET_CATEGORY', payload: res.data})
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const deleteCategory = (id) => {
    return async (dispatch) => {
        try {
            const res = await Axios.delete(`http://localhost:2000/category/delete/${id}`)
            console.log(res.data)
            dispatch({type: 'GET_CATEGORY', payload: res.data})
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const editCategory = (title, id) => {
    return async (dispatch) => {
        console.log({title})
        console.log(id)
        try {
            const res  = await Axios.patch(`http://localhost:2000/category/edit/${id}`, {title})
            console.log(res.data)
            dispatch({type: 'GET_CATEGORY', payload: res.data})
        }
        catch (err) {
            console.log(err)
        }
    }
}