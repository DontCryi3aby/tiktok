import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import { ShareAccount, MoreAccount, FollowedUser } from '~/components/Icons';
import styles from './User.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const User = ({ data: user }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('account-wrapper')}>
                    <Image className={cx('avatar')} src={user.avatar} alt={user.nickname} />
                    <div className={cx('account')}>
                        <h2 className={cx('nickname')}>{user.nickname}</h2>
                        <p className={cx('name')}>{`${user.first_name} ${user.last_name}`}</p>
                        <div className={cx('btns')}>
                            {user.is_followed ? (
                                <>
                                    <Button className={cx('inbox-btn')} outline>
                                        Messages
                                    </Button>
                                    <Button className={cx('unfollow-btn')} leftIcon={<FollowedUser />}></Button>
                                </>
                            ) : (
                                <Button className={cx('follow-btn')} primary>
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
                <p className={cx('bio')}>{user.bio}</p>

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
                <ShareAccount className={cx('share-icon')} />
                <MoreAccount className={cx('more-icon')} />
            </div>
        </div>
    );
};

export default User;

User.propTypes = {
    data: PropTypes.object.isRequired,
};
