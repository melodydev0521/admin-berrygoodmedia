import api from "../utils/api";

export const addRevenue = (revenue) => {
    return api(`/revenue`, {
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
    return api.get(`/revenue`).then(res => res.data)
}

export const deleteRevenue = (key) => {
    api.delete(`/revenue/${key}`)
        .then(res => {
            
        })
        .catch(err => console.log(err));
}