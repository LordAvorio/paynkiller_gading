import Axios from 'axios'

export const login = (data) => {
    return async (dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/user/login', data)

            localStorage.token = res.data.token
            console.log(res.data)

            dispatch({
                type: 'LOGIN',
                payload: res.data
            })

        }
        catch(err){
            dispatch({ type: 'LOGIN_ERR', payload: err.response.data })
        }
    }
}

export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}

export const logout = () => {
    return{
        type: 'LOGOUT'
    }
}