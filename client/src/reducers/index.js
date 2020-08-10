import { combineReducers } from 'redux';
import emailReducer from './emailReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import modalReducer from './modalReducer';
import paymentReducer from './paymentReducer';

export default combineReducers({
    email: emailReducer,
    error: errorReducer,
    auth: authReducer,
    modal: modalReducer,
    payment: paymentReducer
});