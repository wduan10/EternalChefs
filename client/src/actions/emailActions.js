import axios from 'axios';
import { EMAIL_SUCCESS, EMAIL_FAIL, EMAIL_LOADING } from './types';
import { returnErrors } from './errorActions';

export const email = ({ name, email, message }) => (dispatch, getState) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const token = getState().email.token;
    if (token) {
        config.headers['email-token'] = token;
    }

    //Request body
    const body = JSON.stringify({ name, email, message });

    dispatch({ type: EMAIL_LOADING });
    
    axios
        .post('/api/email', body, config)
        .then(res => dispatch({
            type: EMAIL_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.status, err.response.data.msg, EMAIL_FAIL));
            dispatch({
                type: EMAIL_FAIL
            })
        });
}