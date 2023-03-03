import api from "../utils/api";

export const getAccounts = () => {
    return api.get('/account').then(res => res.data);
}

export const addAccount = (account) => {
    return api.post('/account', account).then(res => res.data);
}

export const deleteAccount = _id => {
    return api.delete(`/account/${_id}`).then(res => res.data);
}