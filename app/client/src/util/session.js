import Axios from "axios";

export const login = admin => {
    return Axios.post("http://localhost:5000/session/", admin);
};

export const logout = () => {
    return Axios.delete("http://localhost:5000/session/");
};

// export const signup = admin => {
//     Axios.post("http://localhost:5000/admin/", admin);
// };

export const checkLoggedIn = async preloadedState => {
    const res = await Axios.get("http://localhost:5000/session/");
    const admin = await res.session;
    preloadedState = {};

    if (admin) {
        preloadedState = {
            session: admin,
        };
    }
    return preloadedState;
};