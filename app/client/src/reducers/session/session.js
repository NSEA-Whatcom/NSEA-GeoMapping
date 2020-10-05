import { 
    RECEIVE_CURRENT_USER, 
    LOGOUT_CURRENT_USER 
} from '../../actions/session';

const _nullSession = { userId: null, Username: null }
export default (state = _nullSession, { type, admin }) => {
    Object.freeze(state);
    switch (type) {
        case RECEIVE_CURRENT_USER:
            return admin;
        case LOGOUT_CURRENT_USER:
            return _nullSession;
        default:
            return state;
    }
};