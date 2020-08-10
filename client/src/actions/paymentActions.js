import axios from 'axios';
import { CREATE_PAYMENT_INTENT_SUCCESS, CREATE_PAYMENT_INTENT_FAIL } from './types';
import { returnErrors } from './errorActions';

export const createPaymentIntent = ({ items }) => (dispatch, getState) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const token = getState().auth.token;

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    const body = JSON.stringify({ items });

    axios.post('/api/payment/create-payment-intent', body, config)
        .then(res => {
            return res;
        })
        .then(data => {
            dispatch({
                type: CREATE_PAYMENT_INTENT_SUCCESS,
                payload: data.data
            })
        }
        )
        .catch(err => {
            dispatch(returnErrors(err.response.status, err.response.data, CREATE_PAYMENT_INTENT_FAIL));
            dispatch({
                type: CREATE_PAYMENT_INTENT_FAIL
            })
        })
}