import * as httpRequest from '~/utils/httpRequest';

export const getSuggested = async ({ page = 1, perPage = 5 }) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getFollowing = async ({ page, token }) => {
    try {
        const res = await httpRequest.get('me/followings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAnUser = async ({ nicknameParam, token }) => {
    try {
        const res = await httpRequest.get(`/users/${nicknameParam}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const follow = async ({ id, token }) => {
    try {
        console.log(id, token);
        const res = await httpRequest.post(`/users/${id}/follow`, [], {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const unfollow = async ({ id, token }) => {
    try {
        const res = await httpRequest.post(`/users/${id}/unfollow`, [], {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const comment = async ({ id, token, comment }) => {
    try {
        const res = await httpRequest.post(`/videos/${id}/comments`, [], {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                comment,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
