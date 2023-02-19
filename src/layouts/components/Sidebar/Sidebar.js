/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import config from '~/config';
import { HomeIcon, UserGroupIcon, LiveIcon } from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Sidebar() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const suggestUsersResult = await userService.getSuggested();
            const followingUsersResult = await userService.getSuggested(9, 5);
            setSuggestedUsers(suggestUsersResult);
            setFollowingUsers(followingUsersResult);
        };
        fetchAPI();
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} />
                <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon />} />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} />
            </Menu>

            <SuggestedAccounts label="Suggested accounts" data={suggestedUsers} isShowPreview />
            <SuggestedAccounts label="Following accounts" data={followingUsers} />
        </aside>
    );
}

export default Sidebar;
