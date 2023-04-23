import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Profile.module.scss';
import Button from '~/components/Button';
import { ShareAccount, MoreAccount, FollowedUser, Lock, Triangle } from '~/components/Icons';
import * as userService from '~/services/userService';
import { Context } from '~/store/GlobalContext';
import { isEmptyObj } from '~/store/GlobalFunction';

const cx = classNames.bind(styles);

function Profile() {
    const { nickname: nicknameParam } = useParams();
    const [user, setUser] = useState({});

    const { currentUser } = useContext(Context);

    useEffect(() => {
        (async () => {
            const token = !isEmptyObj(currentUser) ? currentUser.meta.token : '';
            const data = await userService.getAnUser({ nicknameParam, token });
            console.log(data);
            setUser(data);
        })();
    }, [currentUser, nicknameParam]);

    // Ref
    const typeVideoRef = useRef();
    const typeLikedRef = useRef();

    const addActiveClass = (e) => {
        typeVideoRef.current.classList.remove(cx('active'));
        typeLikedRef.current.classList.remove(cx('active'));
        e.target.classList.add(cx('active'));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user')}>
                <div className={cx('info')}>
                    <div className={cx('account-wrapper')}>
                        <img className={cx('avatar')} src={user.avatar} alt="avatar" />
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
            <div className={cx('videos-wrapper')}>
                <div className={cx('videos-type')}>
                    <p ref={typeVideoRef} className={cx('type', 'active')} onClick={addActiveClass}>
                        Videos
                    </p>
                    <p ref={typeLikedRef} className={cx('type')} onClick={addActiveClass}>
                        <Lock className={cx('lock-icon')} />
                        Liked
                    </p>
                    <p className={cx('line')}></p>
                </div>
                <div className={cx('videos-list')}>
                    {!isEmptyObj(user) &&
                        user.videos.map((video) => (
                            <div className={cx('video-div')} key={video.id}>
                                <div className={cx('video-item')}>
                                    <video className={cx('video')} src={video.file_url} muted autoPlay loop />

                                    <p className={cx('views-wrap')}>
                                        <Triangle /> <span className={cx('views')}>{video.views_count}</span>
                                    </p>
                                </div>
                                <p className={cx('caption')}>{video.description}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
