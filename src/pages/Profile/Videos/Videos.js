import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import { Lock } from '~/components/Icons';
import styles from './Videos.module.scss';
import { isEmptyObj } from '~/store/GlobalFunction';
import VideoItem from './VideoItem';

const cx = classNames.bind(styles);

const Videos = ({ data: user }) => {
    const [videoPlay, setVideoPlay] = useState();

    // Ref
    const typeVideoRef = useRef();
    const typeLikedRef = useRef();

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
                    user.videos.map((video, index) => (
                        <VideoItem data={video} index={index} state={[videoPlay, setVideoPlay]} key={video.id} />
                    ))}
            </div>
        </div>
    );
};

export default Videos;

Videos.propTypes = {
    data: PropTypes.object.isRequired,
};
