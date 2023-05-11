import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import { Lock, LockBorder } from '~/components/Icons';
import styles from './Videos.module.scss';
import { isEmptyObj } from '~/store/GlobalFunction';
import VideoItem from './VideoItem';
import { Context as globalContext } from '~/store/GlobalContext';
import { Context as authContext } from '~/store/AuthContext';
import * as videoService from '~/services/videoService';

const cx = classNames.bind(styles);

const Videos = ({ data: user }) => {
    const { currentUser } = useContext(globalContext);

    const [videoPlay, setVideoPlay] = useState();
    const [likedVideosList, setLikedVideosList] = useState([]);

    // Ref
    const typeVideoRef = useRef();
    const typeLikedRef = useRef();

    const [isVideosTab, setIsVideoTab] = useState(true);

    const addActiveClass = (e) => {
        typeVideoRef.current.classList.remove(cx('active'));
        typeLikedRef.current.classList.remove(cx('active'));
        e.target.classList.add(cx('active'));
    };

    const isOwner = () => {
        if (!isEmptyObj(currentUser) && currentUser.data.id === user.id) {
            return true;
        }
        return false;
    };
    console.log(currentUser.data);

    useEffect(() => {
        if (!isEmptyObj(currentUser) && currentUser.data.id === user.id) {
            (async () => {
                const data = await videoService.getLikedVideoList({ id: user.id, token: currentUser.meta.token });
                setLikedVideosList(data);
            })();
        }
    }, [user, currentUser]);

    useEffect(() => {
        if (videoPlay) {
            videoPlay.play();
        }
        return () => {
            if (videoPlay) {
                videoPlay.pause();
                videoPlay.currentTime = 0;
            }
        };
    }, [videoPlay]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('videos-type')}>
                <p
                    ref={typeVideoRef}
                    className={cx('type', 'active')}
                    onClick={(e) => {
                        addActiveClass(e);
                        setIsVideoTab(true);
                    }}
                >
                    Videos
                </p>
                <p
                    ref={typeLikedRef}
                    className={cx('type')}
                    onClick={(e) => {
                        addActiveClass(e);
                        setIsVideoTab(false);
                    }}
                >
                    {!isOwner() && <Lock className={cx('lock')} />}
                    Liked
                </p>
                <p className={cx('line')}></p>
            </div>

            {isVideosTab && (
                <div className={cx('videos-list')}>
                    {!isEmptyObj(user) &&
                        user.videos.map((video, index) => (
                            <VideoItem data={video} index={index} state={[videoPlay, setVideoPlay]} key={video.id} />
                        ))}
                </div>
            )}

            {!isVideosTab && !isOwner() && (
                <div className={cx('liked-tab')}>
                    <div className={cx('inner')}>
                        <LockBorder className={cx('lock-icon')} width="9rem" height="9rem" />
                        <div className={cx('notice')}>
                            <h3>This user's liked videos are private</h3>
                            <p>
                                Videos liked by <span>{user.nickname}</span> are currently hidden
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!isVideosTab && isOwner() && (
                <div className={cx('videos-list')}>
                    {likedVideosList.map((video, index) => (
                        <VideoItem data={video} index={index} state={[videoPlay, setVideoPlay]} key={video.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Videos;

Videos.propTypes = {
    data: PropTypes.object.isRequired,
};
