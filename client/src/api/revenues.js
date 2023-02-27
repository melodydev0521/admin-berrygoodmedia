import axios from "axios";

export const addRevenue = (revenue) => {
    return axios(`api/revenue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { revenues: revenue }
        })
        .then(res => {
            return res.data;
        });
}

export const getRevenues = () => {
    return axios.get(`api/revenue`).then(res => res.data)
}

export const deleteRevenue = (key) => {
    axios.delete(`api/revenue/${key}`)
        .then(res => {
            
        })
        .catch(err => console.log(err));
}