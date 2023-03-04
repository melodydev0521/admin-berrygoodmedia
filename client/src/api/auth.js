import api from '../utils/api';

export const login = user => {
    return api.post('/auth/login', user)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
        });
}

export const loadUser = ()  => {
    return api.get('/auth').then(res => {
        console.log(res.data)
        return res.data;
    }).catch(err => console.log(err));
};