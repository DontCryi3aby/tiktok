import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import Tooltip from '@tippyjs/react';
import Tippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import {
    ShareAccount,
    MoreAccount,
    FollowedUser,
    CopyLinkIcon,
    FacebookIcon,
    EmbedIcon,
    TwitterIcon,
    LineIcon,
    Tick,
} from '~/components/Icons';
import styles from './User.module.scss';
import Image from '~/components/Image';
import { Context as authContext } from '~/store/AuthContext';
import { Context as globalContext } from '~/store/GlobalContext';
import { isEmptyObj } from '~/store/GlobalFunction';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import * as userService from '~/services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ModalProfile from './ModalProfile';

const cx = classNames.bind(styles);

const User = ({ data: user }) => {
    // Get data from context
    const { modalRef, ShowModal } = useContext(authContext);
    const { currentUser, token } = useContext(globalContext);

    // Get follow state context
    const [isFollowed, setIsFollowed] = useState(user.is_followed);

    const modalProfileRef = useRef();

    // Update on modal profile => Re-Render
    const [userInfoProfile, setUserInfoProfile] = useState({
        username: user.nickname,
        name: `${user.first_name} ${user.last_name}`,
        bio: user.bio,
    });

    useEffect(() => {
        setIsFollowed(user.is_followed);
    }, [user.is_followed]);

    const SHARE_MENU = [
        {
            icon: EmbedIcon,
            title: 'Embed',
        },
        {
            icon: FacebookIcon,
            title: 'Share to Facebook',
            to: 'facebook.com',
        },
        {
            icon: LineIcon,
            title: 'Share to Line',
            to: 'Line.me',
        },

        {
            icon: TwitterIcon,
            title: 'Share to Twitter',
            to: 'https://twitter.com/',
        },
        {
            icon: CopyLinkIcon,
            title: 'Copy link',
        },
    ];

    const followUser = async () => {
        await userService.follow({ id: user.id, token: token });
        setIsFollowed(true);
    };

    const unfollowUser = async () => {
        await userService.unfollow({ id: user.id, token: token });
        setIsFollowed(false);
    };

    const isOwner = () => {
        if (!isEmptyObj(currentUser) && currentUser.id === user.id) {
            return true;
        }
        return false;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('account-wrapper')}>
                    <Image className={cx('avatar')} src={user.avatar} alt={userInfoProfile.username} />
                    <div className={cx('account')}>
                        <div>
                            <span className={cx('nickname')}>{userInfoProfile.username}</span>
                            {user.tick && <Tick width="2rem" height="2rem" />}
                        </div>
                        <p className={cx('name')}>{userInfoProfile.name}</p>
                        <div className={cx('btns')}>
                            {isOwner() && (
                                <>
                                    <Button
                                        className={cx('update-profile-btn')}
                                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                        onClick={() => modalProfileRef.current.classList.remove(cx('hide'))}
                                    >
                                        Edit Profile
                                    </Button>
                                    <ModalProfile
                                        state={[userInfoProfile, setUserInfoProfile]}
                                        ref={modalProfileRef}
                                        data={user}
                                    />
                                </>
                            )}
                            {isFollowed && !isOwner() && (
                                <>
                                    <Button className={cx('inbox-btn')} outline>
                                        Messages
                                    </Button>
                                    <Tooltip content="Unfollow" placement="bottom-end">
                                        <Button
                                            onClick={unfollowUser}
                                            className={cx('unfollow-btn')}
                                            leftIcon={<FollowedUser />}
                                        ></Button>
                                    </Tooltip>
                                </>
                            )}

                            {!isFollowed && !isOwner() && (
                                <Button
                                    className={cx('follow-btn')}
                                    primary
                                    onClick={() => {
                                        isEmptyObj(currentUser) ? ShowModal(modalRef) : followUser();
                                    }}
                                >
                                    Follow
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('follows')}>
                    <p className={cx('following')}>
                        <span className={cx('value')}>{user.followings_count}</span>Following
                    </p>
                    <p className={cx('followers')}>
                        <span className={cx('value')}>{user.followers_count}</span>Followers
                    </p>
                    <p className={cx('likes')}>
                        <span className={cx('value')}>{user.likes_count}</span>Likes
                    </p>
                </div>
                <p className={cx('bio')}>{userInfoProfile.bio}</p>

                {user.website_url && (
                    <a className={cx('link')} href={user.website_url}>
                        {user.website_url}
                    </a>
                )}
                {user.facebook_url && (
                    <a className={cx('link')} href={user.facebook_url}>
                        {user.facebook_url}
                    </a>
                )}
                {user.youtube_url && (
                    <a className={cx('link')} href={user.youtube_url}>
                        {user.youtube_url}
                    </a>
                )}
                {user.instagram_url && (
                    <a className={cx('link')} href={user.instagram_url}>
                        {user.instagram_url}
                    </a>
                )}
                {user.twitter_url && (
                    <a className={cx('link')} href={user.twitter_url}>
                        {user.twitter_url}
                    </a>
                )}
            </div>
            <div className={cx('actions')}>
                <div>
                    <Tippy
                        interactive
                        placement="bottom-end"
                        render={(attrs) => (
                            <div className={cx('menu')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    {SHARE_MENU.map((item, index) => (
                                        <div className={cx('item')} key={index}>
                                            <item.icon width="2.6rem" height="2.6rem" className={cx('item-icon')} />
                                            <p className={cx('item-title')}>{item.title}</p>
                                        </div>
                                    ))}
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <ShareAccount className={cx('share-icon')} />
                    </Tippy>
                </div>

                <MoreAccount className={cx('more-icon')} />
            </div>
        </div>
    );
};

export default User;

User.propTypes = {
    data: PropTypes.object.isRequired,
};
