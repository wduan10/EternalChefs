import { CLEAR_ERRORS, RETURN_ERRORS } from '../actions/types';

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

export const returnErrors = (status, msg, id=null) => {
    return {
        type: RETURN_ERRORS,
        payload: { status, msg, id }
    }
}