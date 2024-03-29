import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const res = await httpRequest.get(path, options);
    return res.data;
};

export const post = async (path, data, options = {}) => {
    const res = await httpRequest.post(path, data, options);
    return res.data;
};

export const patch = async (path, data, options = {}) => {
    const res = await httpRequest.patch(path, data, options);
    return res.data;
};

export default httpRequest;
