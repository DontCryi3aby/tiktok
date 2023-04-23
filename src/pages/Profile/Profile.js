import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';

import styles from './Profile.module.scss';
import Button from '~/components/Button';
import { ShareAccount, MoreAccount, FollowedUser, Lock, Triangle } from '~/components/Icons';

const cx = classNames.bind(styles);

function Profile() {
    const websiteUrl = false;
    const facebookUrl = false;
    const youtubeUrl = false;
    const twitterUrl = false;
    const instagramUrl = false;

    const isFollow = false;

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
                        <img
                            className={cx('avatar')}
                            src="https://images4.alphacoders.com/120/thumbbig-1205177.webp"
                            alt="avatar"
                        />
                        <div className={cx('account')}>
                            <h2 className={cx('nickname')}>thanhthao15.03</h2>
                            <p className={cx('name')}>Nguyen Thanh Thao</p>
                            <div className={cx('btns')}>
                                {!isFollow ? (
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
                            <span className={cx('value')}>19</span>Following
                        </p>
                        <p className={cx('followers')}>
                            <span className={cx('value')}>333.6K</span>Followers
                        </p>
                        <p className={cx('likes')}>
                            <span className={cx('value')}>8.6M</span>Likes
                        </p>
                    </div>
                    <p className={cx('contact')}>Contact: tht15112003@gmail.com</p>

                    {websiteUrl && (
                        <a className={cx('link')} href={websiteUrl}>
                            xxx.stone.com.vn
                        </a>
                    )}
                    {websiteUrl && (
                        <a className={cx('link')} href={facebookUrl}>
                            xxx.stone.com.vn
                        </a>
                    )}
                    {youtubeUrl && (
                        <a className={cx('link')} href={youtubeUrl}>
                            {youtubeUrl}
                        </a>
                    )}
                    {twitterUrl && (
                        <a className={cx('link')} href={twitterUrl}>
                            {twitterUrl}
                        </a>
                    )}
                    {instagramUrl && (
                        <a className={cx('link')} href={instagramUrl}>
                            {instagramUrl}
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
                    <div className={cx('video-div')}>
                        <div className={cx('video-item')}>
                            <video
                                className={cx('video')}
                                src="https://files.fullstack.edu.vn/f8-tiktok/videos/8-630268a08faa9.mp4"
                                muted
                                autoPlay
                                loop
                            />

                            <p className={cx('views-wrap')}>
                                <Triangle /> <span className={cx('views')}>14.7K</span>
                            </p>
                        </div>
                        <p className={cx('caption')}>
                            Câu chuyện chàng trai đứng dừng đèn đỏ và cô gái nhỏ ở phía bên kia...
                        </p>
                    </div>
                    <div className={cx('video-div')}>
                        <div className={cx('video-item')}>
                            <video
                                className={cx('video')}
                                src="https://files.fullstack.edu.vn/f8-tiktok/videos/8-630268a08faa9.mp4"
                                muted
                                autoPlay
                                loop
                            />

                            <p className={cx('views-wrap')}>
                                <Triangle /> <span className={cx('views')}>14.7K</span>
                            </p>
                        </div>
                        <p className={cx('caption')}>
                            Câu chuyện chàng trai đứng dừng đèn đỏ và cô gái nhỏ ở phía bên kia...
                        </p>
                    </div>
                    <div className={cx('video-div')}>
                        <div className={cx('video-item')}>
                            <video
                                className={cx('video')}
                                src="https://files.fullstack.edu.vn/f8-tiktok/videos/8-630268a08faa9.mp4"
                                muted
                                autoPlay
                                loop
                            />

                            <p className={cx('views-wrap')}>
                                <Triangle /> <span className={cx('views')}>14.7K</span>
                            </p>
                        </div>
                        <p className={cx('caption')}>
                            Câu chuyện chàng trai đứng dừng đèn đỏ và cô gái nhỏ ở phía bên kia...
                        </p>
                    </div>
                    <div className={cx('video-div')}>
                        <div className={cx('video-item')}>
                            <video
                                className={cx('video')}
                                src="https://files.fullstack.edu.vn/f8-tiktok/videos/8-630268a08faa9.mp4"
                                muted
                                autoPlay
                                loop
                            />

                            <p className={cx('views-wrap')}>
                                <Triangle /> <span className={cx('views')}>14.7K</span>
                            </p>
                        </div>
                        <p className={cx('caption')}>
                            Câu chuyện chàng trai đứng dừng đèn đỏ và cô gái nhỏ ở phía bên kia...
                        </p>
                    </div>
                    <div className={cx('video-div')}>
                        <div className={cx('video-item')}>
                            <video
                                className={cx('video')}
                                src="https://files.fullstack.edu.vn/f8-tiktok/videos/8-630268a08faa9.mp4"
                                muted
                                autoPlay
                                loop
                            />

                            <p className={cx('views-wrap')}>
                                <Triangle /> <span className={cx('views')}>14.7K</span>
                            </p>
                        </div>
                        <p className={cx('caption')}>
                            Câu chuyện chàng trai đứng dừng đèn đỏ và cô gái nhỏ ở phía bên kia...
                        </p>
                    </div>
                    <div className={cx('video-div')}>
                        <div className={cx('video-item')}>
                            <video
                                className={cx('video')}
                                src="https://files.fullstack.edu.vn/f8-tiktok/videos/8-630268a08faa9.mp4"
                                muted
                                autoPlay
                                loop
                            />

                            <p className={cx('views-wrap')}>
                                <Triangle /> <span className={cx('views')}>14.7K</span>
                            </p>
                        </div>
                        <p className={cx('caption')}>
                            Câu chuyện chàng trai đứng dừng đèn đỏ và cô gái nhỏ ở phía bên kia...
                        </p>
                    </div>
                    <div className={cx('video-div')}>
                        <div className={cx('video-item')}>
                            <video
                                className={cx('video')}
                                src="https://files.fullstack.edu.vn/f8-tiktok/videos/8-630268a08faa9.mp4"
                                muted
                                autoPlay
                                loop
                            />

                            <p className={cx('views-wrap')}>
                                <Triangle /> <span className={cx('views')}>14.7K</span>
                            </p>
                        </div>
                        <p className={cx('caption')}>
                            Câu chuyện chàng trai đứng dừng đèn đỏ và cô gái nhỏ ở phía bên kia...
                        </p>
                    </div>
                    <div className={cx('video-div')}>
                        <div className={cx('video-item')}>
                            <video
                                className={cx('video')}
                                src="https://files.fullstack.edu.vn/f8-tiktok/videos/8-630268a08faa9.mp4"
                                muted
                                autoPlay
                                loop
                            />

                            <p className={cx('views-wrap')}>
                                <Triangle /> <span className={cx('views')}>14.7K</span>
                            </p>
                        </div>
                        <p className={cx('caption')}>
                            Câu chuyện chàng trai đứng dừng đèn đỏ và cô gái nhỏ ở phía bên kia...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
