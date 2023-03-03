import axios from "axios";

export const login = user => {
    return axios.post('/api/auth/login', user)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
        });
}