import * as apiUtil from '../util/session';
import { receiveErrors } from './error';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

const receiveCurrentUser = admin => ({
    type: RECEIVE_CURRENT_USER,
    admin
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const login = admin => async dispatch => {
    const res = await apiUtil.login(admin);
    const data = await res.data;
    
    if (res.status === 200) {
        return dispatch(receiveCurrentUser(data));
    }

    return dispatch(receiveErrors(data))
};

export const logout = () => async dispatch => {
    const res = await apiUtil.logout();
    const data = await res;

    if (res !== undefined && res !== null) {
        return dispatch(logoutCurrentUser());
    }
    
    return dispatch(receiveErrors(data))
};

// export const signup = user => async dispatch => {
//     const res = await apiUtil.signup(user);
//     const data = await res;

//     if (res.ok) {
//         return dispatch(receiveCurrentUser(data));
//     }
    
//     return dispatch(receiveErrors(data))
// };