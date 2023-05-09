import * as httpRequest from '~/utils/httpRequest';

export const getVideosList = async ({ type, page = 1, token }) => {
    try {
        const res = await httpRequest.get('videos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAVideo = async ({ id, token }) => {
    try {
        const res = await httpRequest.get(`videos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCommentsList = async ({ id, token }) => {
    try {
        const res = await httpRequest.get(`videos/${id}/comments`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const likeAVideo = async ({ id, token }) => {
    try {
        const res = await httpRequest.post(`videos/${id}/like`, [], {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('liked');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const unlikeAVideo = async ({ id, token }) => {
    try {
        const res = await httpRequest.post(`videos/${id}/unlike`, [], {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('unliked');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
