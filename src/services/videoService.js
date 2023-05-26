import * as httpRequest from '~/utils/httpRequest';

export const getVideosList = async ({ type, page = 1, token }) => {
    try {
        const res = await httpRequest.get('videos', {
            headers: {
                Authorization: token,
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

export const getLikedVideoList = async ({ id, token }) => {
    try {
        const res = await httpRequest.get(`users/${id}/liked-videos`, {
            headers: {
                Authorization: token,
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
                Authorization: token,
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
                Authorization: token,
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
                Authorization: token,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const unlikeAVideo = async ({ id, token }) => {
    try {
        const res = await httpRequest.post(`videos/${id}/unlike`, [], {
            headers: {
                Authorization: token,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
