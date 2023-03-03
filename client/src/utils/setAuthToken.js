import api from './api';

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('userInfo', JSON.stringify(token));
    } else {
        delete api.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('userInfo');
    }
};

export default setAuthToken;