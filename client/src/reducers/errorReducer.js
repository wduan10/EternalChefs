import { CLEAR_ERRORS, RETURN_ERRORS} from '../actions/types.js';

const initialState = {
    status: null,
    msg: {},
    id: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CLEAR_ERRORS:
            return {
                status: null,
                msg: {},
                id: null
            }
        case RETURN_ERRORS:
            return {
                status: action.payload.status,
                msg: action.payload.msg,
                id: action.payload.id
            }
        default:
            return state
    }
}