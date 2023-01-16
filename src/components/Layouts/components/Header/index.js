import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCircleXmark,
    faCoins,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faLanguage,
    faMagnifyingGlass,
    faPlus,
    faUser,
    faSignOut,
    faSpinner,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon } from '~/components/Icons';
import Image from '~/components/Image';

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
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    // Fake user login
    const currentUser = true;

    useEffect(() => {
        setInterval(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // handle change language
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="Tiktok" />

                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <div className={cx('search-inner')}>
                            <input placeholder="Search accounts and videos" spellCheck={false} />
                            <button className={cx('search-action')}>
                                <FontAwesomeIcon icon={faCircleXmark} className={cx('clear')} />
                                <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                            </button>
                        </div>

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    <Button leftIcon={<FontAwesomeIcon icon={faPlus} />} className={cx('upload')}>
                        Upload
                    </Button>
                    {currentUser ? (
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
                        </>
                    ) : (
                        <>
                            <Button primary className={cx('login')}>
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://i.pinimg.com/564x/91/f8/d8/91f8d839f5b0cc5409cd13a34f486715.jpg"
                                alt="avatar"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
