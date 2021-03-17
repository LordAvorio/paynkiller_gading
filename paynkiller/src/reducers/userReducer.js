let INITIAL_STATE = {
    username: "",
    id_customer: null,
    errLogin: ""
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return{
                ...state,
                username: action.payload.username,
                id_customer: action.payload.id_customer
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
        default:
            return state
    }
}

export default userReducer