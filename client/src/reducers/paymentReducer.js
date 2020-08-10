import { CREATE_PAYMENT_INTENT_SUCCESS, CREATE_PAYMENT_INTENT_FAIL } from '../actions/types';

const initialState = {
    clientSecret: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_PAYMENT_INTENT_SUCCESS:
            return {
                clientSecret: action.payload.clientSecret
            }
        case CREATE_PAYMENT_INTENT_FAIL:
            return {
                clientSecret: null
            }
        default:
            return state;
    }
}