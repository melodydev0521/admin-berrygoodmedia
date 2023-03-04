import api from './api';

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (user) => {
    if (user) {
        api.defaults.headers.common['x-auth-token'] = user.token;
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        delete api.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('user');
    }
};

export default setAuthToken;