import api from "../utils/api";

export const getData = () => {
    return api.get('/snapchat').then(res => res.data);
}

export const addData = (account) => {
    return api.post('/snapchat', account)
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

export const deleteData = _id => {
    return api.delete(`/snapchat/${_id}`).then(res => res.data);
}