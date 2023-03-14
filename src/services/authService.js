import * as httpRequest from '~/utils/httpRequest';

export const login = async (email, password) => {
    try {
        const res = await httpRequest.post('auth/login', {
            email,
            password,
        });
        return res.data;
    } catch (error) {
        return { errorCode: error.response.status };
    }
};
