let INITIAL_STATE = {
    dataCustomOrder: [],
    dataCustomOrderDetail: [],
    errLogin: "",
    res: '',
    errRes: ''
}

const customOrderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_CUSTOM_ORDER_ALL':
            return {
                ...state,
                dataCustomOrder: action.payload
            }
        case 'GET_CUSTOM_ORDER_DETAIL':
            return {
                ...state,
                dataCustomOrderDetail: action.payload
            }
        case 'CUSTOM_ORDER_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        case 'REMOVE_ERR':
            return {
                ...state,
                errLogin: ""
            }
        case 'CUSTOM_ORDER_RES':
            return {
                ...state,
                res: action.payload
            }
        case 'REMOVE_RES_UPLOAD':
            return {
                ...state,
                res: '',
                errRes: ''
            }
        case 'CUSTOM_ORDER_RES_ERR':
            return {
                ...state,
                errRes: action.payload
            }
        default:
            return state
    }
}

export default customOrderReducer