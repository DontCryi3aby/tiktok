import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import { Lock, LockBorder } from '~/components/Icons';
import styles from './Videos.module.scss';
import { isEmptyObj } from '~/store/GlobalFunction';
import VideoItem from './VideoItem';

const cx = classNames.bind(styles);

const Videos = ({ data: user }) => {
    const [videoPlay, setVideoPlay] = useState();

    // Ref
    const typeVideoRef = useRef();
    const typeLikedRef = useRef();

    const [isVideosTab, setIsVideoTab] = useState(true);

    const addActiveClass = (e) => {
        typeVideoRef.current.classList.remove(cx('active'));
        typeLikedRef.current.classList.remove(cx('active'));
        e.target.classList.add(cx('active'));
    };

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
                    <Lock className={cx('lock')} />
                    Liked
                </p>
                <p className={cx('line')}></p>
            </div>
            {isVideosTab ? (
                <div className={cx('videos-list')}>
                    {!isEmptyObj(user) &&
                        user.videos.map((video, index) => (
                            <VideoItem data={video} index={index} state={[videoPlay, setVideoPlay]} key={video.id} />
                        ))}
                </div>
            ) : (
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
        </div>
    );
};

export default Videos;

Videos.propTypes = {
    data: PropTypes.object.isRequired,
};
