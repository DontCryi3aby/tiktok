import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { Triangle } from '~/components/Icons';
import styles from './Videos.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const VideoItem = ({ data: video, state, index }) => {
    const [, setVideoPlay] = state;
    const videoRef = useRef();

    // Tự động phát video đầu tiên
    useEffect(() => {
        if (index === 0) {
            setVideoPlay(videoRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Link to={`/@${video.user.nickname}/video/${video.id}`}>
            <div className={cx('video-div')} key={video.id}>
                <div
                    className={cx('video-item')}
                    onMouseOver={() => {
                        setVideoPlay(videoRef.current);
                    }}
                >
                    <video ref={videoRef} className={cx('video')} src={video.file_url} muted loop />

                    <p className={cx('views-wrap')}>
                        <Triangle /> <span className={cx('views')}>{video.views_count}</span>
                    </p>
                </div>
                <p className={cx('caption')}>{video.description}</p>
            </div>
        </Link>
    );
};

export default VideoItem;

VideoItem.propTypes = {
    data: PropTypes.object.isRequired,
    state: PropTypes.array,
    index: PropTypes.number,
};
