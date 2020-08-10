import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, OPEN_REGISTER_MODAL, CLOSE_REGISTER_MODAL } from '../actions/types';

const initialState = {
    loginModal: false,
    registerModal: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case OPEN_LOGIN_MODAL:
            return {
                ...state,
                loginModal: true
            }
        case CLOSE_LOGIN_MODAL:
            return {
                ...state,
                loginModal: false
            }
        case OPEN_REGISTER_MODAL:
            return {
                loginModal: false,
                registerModal: true
            }
        case CLOSE_REGISTER_MODAL:
            return {
                ...state,
                registerModal: false
            }
        default:
            return state
    }
}