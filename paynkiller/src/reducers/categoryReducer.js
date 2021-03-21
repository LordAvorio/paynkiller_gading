const INITIAL_STATE = {
    cate: [],
    selectPickerCategory: []
}

const categoryReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_CATEGORY':
            return {
                cate: action.payload
            }
            case 'SELECT_PICKER_CATEGORY':
                return{
                    ...state,
                    selectPickerCategory: action.payload
                }
        default:
            return state
    }
}

export default categoryReducer
