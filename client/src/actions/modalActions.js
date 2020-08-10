import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, OPEN_REGISTER_MODAL, CLOSE_REGISTER_MODAL } from './types';

export const openLoginModal = () => {
    return {
        type: OPEN_LOGIN_MODAL
    }
}

export const closeLoginModal = () => {
    return {
        type: CLOSE_LOGIN_MODAL
    }
}

export const openRegisterModal = () => {
    return {
        type: OPEN_REGISTER_MODAL
    }
}

export const closeRegisterModal = () => {
    return {
        type: CLOSE_REGISTER_MODAL
    }
}