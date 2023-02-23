import { useEffect, useState } from 'react';

import ListAccounts from '~/components/ListAccounts';
import * as userService from '~/services/userService';

function SuggestedAccounts() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    const [isSeeAll, setIsSeeAll] = useState(true);
    let titleBtn = isSeeAll ? 'See all' : 'See less';
    const currentSuggestedUsers = isSeeAll ? suggestedUsers.slice(0, 5) : suggestedUsers;

    // Get suggested users
    useEffect(() => {
        const fetchAPI = async () => {
            const suggestUsersResult = await userService.getSuggested({ page: 1, perPage: 20 });
            setSuggestedUsers(suggestUsersResult);
        };
        fetchAPI();
    }, []);

    // Toggle users when click 'See all' button under suggested accounts
    const handleClick = () => {
        setIsSeeAll(!isSeeAll);
    };

    return (
        <ListAccounts
            label="Suggested accounts"
            data={currentSuggestedUsers}
            isShowPreview
            titleBtn={titleBtn}
            onClickBtn={handleClick}
        />
    );
}

export default SuggestedAccounts;
