/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import config from '~/config';
import { HomeIcon, UserGroupIcon, LiveIcon } from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';
import Button from '~/components/Button';
import Hashtag from '~/components/Hashtag';
import MusicTag from '~/components/MusicTag';

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

            <div className={cx('discover')}>
                <p className={cx('title')}>Discover</p>
                <div className={cx('tags')}>
                    <Button className={cx('tag-btn')}>
                        <MusicTag label="Grow up - Guhancci Remix" />
                    </Button>
                    <Button className={cx('tag-btn')}>
                        <MusicTag label="Khóc cùng em Ver2 x Thái Hoàng Remix" />
                    </Button>
                    <Button className={cx('tag-btn')}>
                        <Hashtag label="suthatla" />
                    </Button>
                    <Button className={cx('tag-btn')}>
                        <MusicTag label="Da da da" />
                    </Button>
                    <Button className={cx('tag-btn')}>
                        <MusicTag label="Never Give It Up - Jet Remix" />
                    </Button>
                    <Button className={cx('tag-btn')}>
                        <Hashtag label="sansangthaydoi" />
                    </Button>
                    <Button className={cx('tag-btn')}>
                        <Hashtag label="7749hieuung" />
                    </Button>
                    <Button className={cx('tag-btn')}>
                        <Hashtag label="genzlife" />
                    </Button>

                    <Button className={cx('tag-btn')}>
                        <MusicTag label="Phía sau em" />
                    </Button>
                    <Button className={cx('tag-btn')}>
                        <Hashtag label="mackedoi" />
                    </Button>
                </div>
            </div>

            <div className={cx('footer')}>
                <span className={cx('link')}>About</span>
                <span className={cx('link')}>Newsroom</span>
                <span className={cx('link')}>Contact</span>
                <span className={cx('link')}>Careers</span>
                <span className={cx('link')}>ByteDance</span>
                <span className={cx('link')}>TikTok for Good</span>
                <span className={cx('link')}>Advertise</span>
                <span className={cx('link')}>Developers</span>
                <span className={cx('link')}>Transparency</span>
                <span className={cx('link')}>TikTok Rewards</span>
                <span className={cx('link')}>TikTok Browse</span>
                <span className={cx('link')}>TikTok Embeds</span>
                <span className={cx('link')}>Help</span>
                <span className={cx('link')}>Safety</span>
                <span className={cx('link')}>Terms</span>
                <span className={cx('link')}>Privacy</span>
                <span className={cx('link')}>Creator Portal</span>
                <span className={cx('link')}>Community Guidelines</span>
                <p className={cx('copyright')}>
                    <FontAwesomeIcon className={cx('coppyright-icon')} icon={faCopyright} />
                    2023 TikTok
                </p>
            </div>
        </aside>
    );
}

export default Sidebar;