import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import config from '~/config';
import { HomeIcon, UserGroupIcon, LiveIcon } from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from './SuggestedAccounts';
import FollowingAccounts from './FollowingAccounts';
import Button from '~/components/Button';
import Hashtag from '~/components/Hashtag';
import MusicTag from '~/components/MusicTag';
import { Context } from '~/store/AuthContext';

const cx = classNames.bind(styles);

function Sidebar() {
    // Fake Login Access
    const [userLogin, setUserLogin] = useState(false);

    // Get data from AuthContext
    const { modalRef, ShowModal } = useContext(Context);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} />
                <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon />} />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} />
            </Menu>

            {!userLogin && (
                <div className={cx('login-notify')}>
                    <p className={cx('desc')}>Log in to follow creators, like videos, and view comments.</p>
                    <Button className={cx('login-btn')} outline onClick={() => ShowModal(modalRef)}>
                        Log in
                    </Button>
                </div>
            )}

            <SuggestedAccounts />

            {userLogin && <FollowingAccounts />}

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
