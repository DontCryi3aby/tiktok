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

export const getFollowing = async ({ type, page = 1 }) => {
    try {
        const res = await httpRequest.get('videos', {
            headers: {
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTY3NjgyNzI4NCwiZXhwIjoxNjc5NDE5Mjg0LCJuYmYiOjE2NzY4MjcyODQsImp0aSI6IkJLSFROOFhnMmtqQVp0OEciLCJzdWIiOjQ5NzMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.W_B2mGlZv30g2uVIVfxiJO9su92Tz6kYgr-eFY2a0Ps',
            },
            params: {
                type,
                page,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
