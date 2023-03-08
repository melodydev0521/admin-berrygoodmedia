import api from "../utils/api";

export const getData = () => {
    return api.get('/account').then(res => res.data);
}

export const addData = (account) => {
    return api.post('/account', account)
        .then(res => {
            return {
                isValid: true,
                data: res.data
            }
        })
        .catch(err => {
            return {
                isValid: false,
                errors: err.response.data
            };
        });
}

export const editData = _id => {
    return api
        .delete(`/account/${_id}`)
        .then(res => res.data)
        .catch(err => ({
            isValid: false,
            errors: err.response.data
        }));
}

export const deleteData = _id => {
    return api.delete(`/account/${_id}`).then(res => res.data);
}