import { useEffect, useState, useContext } from 'react';
import ListAccounts from '~/components/ListAccounts';
import * as userService from '~/services/userService';
import { isEmptyObj } from '~/store/GlobalFunction';
import { Context as globalContext } from '~/store/GlobalContext';

function FollowingAccounts() {
    // Get data from UserLoginContext
    const { currentUser, token } = useContext(globalContext);

    const [followingUsers, setFollowingUsers] = useState([]);

    const [page, setPage] = useState(1);
    const [isSeeMore, setIsSeeMore] = useState(true);
    const [isFull, setIsFull] = useState(false);

    const currentList = isSeeMore ? followingUsers : followingUsers.slice(0, 5);
    let titleBtn = isSeeMore && isFull ? 'See less' : 'See more';
    // Get following users
    useEffect(() => {
        (async () => {
            if (!isEmptyObj(currentUser)) {
                const data = await userService.getFollowing({
                    page: page,
                    token: token,
                });
                if (data.length <= 0) {
                    setIsFull(true);
                } else {
                    setFollowingUsers((prev) => [...prev, ...data]);
                }
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleClick = () => {
        if (isFull) {
            setIsSeeMore(!isSeeMore);
        } else {
            setPage(page + 1);
        }
    };

    return <ListAccounts label="Following accounts" data={currentList} titleBtn={titleBtn} onClickBtn={handleClick} />;
}

export default FollowingAccounts;
