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
} from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';

export const resetSuccess = () => (dispatch, getState) => {
    const payload = {
        user: getState().auth.user,
        token: getState().auth.token
    }
    dispatch({
        type: 'RESET_SUCCESS',
        payload: payload
    })
}

export const login = ({ email, password }) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    dispatch({ type: USER_LOADING });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err);
            dispatch(returnErrors(err.response.status, err.response.data, LOGIN_FAIL));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const register = ({ name, email, password, retype }) => (dispatch) => {
    dispatch({ type: USER_LOADING });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, retype });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.status, err.response.data, REGISTER_FAIL));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS });
}

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const token = getState().auth.token;

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    axios.get('/api/auth/user', config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.status, err.response.data, AUTH_ERROR));
            dispatch({
                type: AUTH_ERROR
            });
        })
}

export const updateUser = ({ user }) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const token = getState().auth.token;

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    const body = JSON.stringify({ user });

    axios.post('/api/payment/update-user', body, config)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.status, err.response.data, UPDATE_USER_FAIL));
            dispatch({
                type: UPDATE_USER_FAIL
            })
        })
}