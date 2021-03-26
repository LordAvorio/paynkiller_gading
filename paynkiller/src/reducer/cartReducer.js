let INITIAL_STATE = {
    cart: [],
    checkout: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_CART': 
            return{
                ...state,
                cart: action.payload
            }
        case 'GET_CHECKOUT': {
            return{
                ...state,
                checkout: action.payload
            }
        }
        default:
            return state
    }
}

export default cartReducer