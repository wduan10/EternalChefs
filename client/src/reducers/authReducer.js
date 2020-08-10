import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_USER_SUCCESS, 
    UPDATE_USER_FAIL
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    token: localStorage.getItem('token'),
    isLoading: null,
    user: null,
    success: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'RESET_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                success: false
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                success: true
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isLoading: false,
                isAuthenticated: false,
                user: null
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case UPDATE_USER_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}