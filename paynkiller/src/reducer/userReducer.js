let INITIAL_STATE = {
    username: "",
    id_customer: null,
    errLogin: "",
    errFpass: '',
    FpassRes: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return{
                ...state,
                username: action.payload.username,
                id_customer: action.payload.id_customer,
                cart: action.payload.cart
            }
        case 'LOGOUT':
            return INITIAL_STATE
        case 'LOGIN_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        case 'REMOVE_ERR':
            return{
                ...state,
                errLogin: ""
            }
        case 'FORGOT_PASS':
            return{
                ...state,
                FpassRes: action.payload
            }
        case 'REMOVE_RES' :
            return {
                ...state,
                FpassRes: '',
                errFpass: ''
            }
        case 'Err_FORGOT_PASS':
            return{
                ...state,
                errFpass: action.payload
            }
        default:
            return state
    }
}

export default userReducer