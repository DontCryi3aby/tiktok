import { useEffect, useState } from 'react';
import ListAccounts from '~/components/ListAccounts';
import * as userService from '~/services/userService';

function FollowingAccounts() {
    const INIT_PAGE = 23;

    const [followingUsers, setFollowingUsers] = useState([]);

    const [page, setPage] = useState(INIT_PAGE);
    const [isSeeMore, setIsSeeMore] = useState(true);
    const [isFull, setIsFull] = useState(false);

    const currentList = isSeeMore ? followingUsers : followingUsers.slice(0, 5);
    let titleBtn = isSeeMore && isFull ? 'See less' : 'See more';
    // Get following users
    useEffect(() => {
        const fetchAPI = async () => {
            const followingUsersResult = await userService.getSuggested({ page: page, perPage: 5 });
            if (followingUsersResult.length === 0) {
                setIsFull(true);
            } else {
                setFollowingUsers((prev) => [...prev, ...followingUsersResult]);
            }
        };
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleClick = () => {
        if (isFull) {
            setIsSeeMore(!isSeeMore);
        } else {
            setPage(page + 1);
        }
    };

    return (
        <ListAccounts
            label="Suggested accounts"
            data={currentList}
            isShowPreview
            titleBtn={titleBtn}
            onClickBtn={handleClick}
        />
    );
}

export default FollowingAccounts;
