import axios from "axios";
import api from '../utils/api';

export const login = user => {
    return axios.post('/api/auth/login', user)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
        });
}

export const loadUser = async ()  => {
    try {
        const res = await api.get('/auth');
        return res.data
    } catch (err) {
        console.log(err)
    }
};