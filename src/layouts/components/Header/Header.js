import {
    faCircleQuestion,
    faCoins,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faLanguage,
    faPlus,
    faSignOut,
    faUser,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import config from '~/config';
import images from '~/assets/images';
import Button from '~/components/Button';
import { InboxIcon, MessageIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import styles from './Header.module.scss';
import { Context as authContext } from '~/store/AuthContext';
import { Context as globalContext } from '~/store/GlobalContext';
import { defaultFn, isEmptyObj, reloadPage } from '~/store/GlobalFunction';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@thach02hp',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faVideo} />,
        title: 'LIVE Studio',
        to: '/studio',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        type: 'logout',
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/',
        separate: true,
    },
];

function Header({ isFullScreen = false }) {
    // Get data from UserLoginContext
    const { currentUser } = useContext(globalContext);

    // Get data from AuthContext
    const { modalRef, ShowModal } = useContext(authContext);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // handle change language
                break;
            case 'logout':
                handleLogout();
                break;
            default:
        }
    };

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem('user');
        reloadPage();
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', { fullscreen: isFullScreen })}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <Image src={images.logo} alt="Tiktok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        className={cx('upload')}
                        onClick={() => {
                            isEmptyObj(currentUser) ? ShowModal(modalRef) : defaultFn();
                        }}
                    >
                        Upload
                    </Button>
                    {!isEmptyObj(currentUser) ? (
                        <>
                            <Tippy placement="bottom" content="Messages">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy placement="bottom" content="Inbox">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>24</span>
                                </button>
                            </Tippy>
                            <Menu items={USER_MENU} onChange={handleMenuChange}>
                                <Image className={cx('user-avatar')} src={currentUser.data.avatar} alt="avatar" />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button primary className={cx('login')} onClick={() => ShowModal(modalRef)}>
                                Log in
                            </Button>
                            <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;

Header.propTypes = {
    className: PropTypes.string,
};
