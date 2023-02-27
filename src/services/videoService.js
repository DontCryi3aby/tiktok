import * as httpRequest from '~/utils/httpRequest';

export const getVideosList = async ({ type, page = 1 }) => {
    try {
        const res = await httpRequest.get('videos', {
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
