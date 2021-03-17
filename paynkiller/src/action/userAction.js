import Axios from 'axios'

export const register = (body) => {
    return async (dispatch) => {
        try{
            const res = await Axios.post('http://localhost:2000/user/register', body)
            console.log(res.data)

            await localStorage.setItem('token', res.data.token)

            dispatch({type: 'LOGIN', payload: res.data})
        } catch (err) {
            dispatch({ type: 'LOGIN_ERR', payload: err.response.data })
            console.log(err)
        }
    }
} 

export const removeError = () => {
    return{
        type: 'REMOVE_ERR'
    }
}

