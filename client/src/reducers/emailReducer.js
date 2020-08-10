import { EMAIL_SUCCESS, EMAIL_FAIL, EMAIL_LOADING } from '../actions/types.js';

const initialState = {
    token: localStorage.getItem('emailToken'),
    emailStatus: null,
    isLoading: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case EMAIL_SUCCESS:
            localStorage.setItem('emailToken', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                emailStatus: 'success',
                isLoading: false
            }
        case EMAIL_FAIL:
            return {
                ...state,
                emailStatus: 'fail',
                isLoading: false
            }
        case EMAIL_LOADING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}