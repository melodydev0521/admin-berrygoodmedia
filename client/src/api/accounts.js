import axios from 'axios';

export const getAccounts = () => {
    return axios.get('/api/account').then(res => res.data);
}

export const addAccount = (account) => {
    return axios.post('/api/account', account).then(res => res.data);
}

export const deleteAccount = _id => {
    return axios.delete(`/api/account/${_id}`).then(res => res.data);
}