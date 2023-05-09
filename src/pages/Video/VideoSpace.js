import classNames from 'classnames/bind';
import { useEffect, useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';

import styles from './Video.module.scss';
import { MuteIcon, VolumeIcon, PlayIcon, ArrowUp, ArrowDown, CloseIcon } from '~/components/Icons';
import { Context } from '~/store/GlobalContext';
import { StopPropagation, PreventDefault } from '~/store/GlobalFunction';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const VideoSpace = ({ data: video }) => {
    // Get data from VideoContext
    const { volumeState, mutedState } = useContext(Context);

    // State context
    const [volume, setVolume] = volumeState;
    const [isMuted, setIsMuted] = mutedState;

    // State
    const [isPlaying, setIsPlaying] = useState(true);

    // Ref
    const videoRef = useRef();
    const volumeBarRef = useRef();
    const volumeRef = useRef();

    const shapeOfVideo = video.meta.video.resolution_x > video.meta.video.resolution_y ? 'vertical' : 'horizontal';

    useEffect(() => {
        if (isMuted) {
            videoRef.current.volume = 0;
            volumeRef.current.style.height = 0;
        } else {
            videoRef.current.volume = volume;
            volumeRef.current.style.height = volume * 100 + '%';
        }
    }, [isMuted, volume]);

    const togglePlay = () => {
        isPlaying ? videoRef.current.pause() : videoRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    // Handle when mouse down volume bar
    const handleVolumeChange = (e) => {
        // Change volume and volume bar's height
        const changeVolumeFn = (percent) => {
            if (percent <= 0) {
                percent = 0;
                setIsMuted(true);
            } else {
                if (percent > 100) {
                    percent = 100;
                }
                setIsMuted(false);
            }
            videoRef.current.volume = percent / 100;
            volumeRef.current.style.height = percent + '%';
            setVolume(percent / 100);
        };

        // Get coordinates
        const endPoint = Math.floor(volumeBarRef.current.getBoundingClientRect().bottom);
        const height = volumeBarRef.current.clientHeight;
        let activePoint = e.clientY;

        let percent = ((endPoint - activePoint) / height) * 100;
        changeVolumeFn(percent);

        // Handle mouse move while mouse down volume bar (Hold mouse)
        window.onmousemove = (e) => {
            activePoint = e.clientY;
            percent = ((endPoint - activePoint) / height) * 100;
            changeVolumeFn(percent);
        };

        // Remove Fn when mouse up
        window.onmouseup = () => {
            window.onmousemove = null;
        };
    };

    return (
        <div className={cx('video-wrapper')}>
            <Image className={cx('background')} src={video.thumb_url} alt={video.user.nickname} />
            <video
                ref={videoRef}
                onClick={togglePlay}
                className={cx('video', shapeOfVideo)}
                src={video.file_url}
                autoPlay
                loop
            />
            <Link to={`/`} className={cx('left')}>
                <CloseIcon className={cx('btn')} />
            </Link>

            <div className={cx('center')}>{!isPlaying && <PlayIcon className={cx('play-btn')} />}</div>

            <div className={cx('right')}>
                <div className={cx('report-btn')}>
                    <FontAwesomeIcon className={cx('flag')} icon={faFlag} />
                    <span>Report</span>
                </div>
                <div className={cx('up-down')}>
                    <ArrowUp className={cx('up', 'btn')} />
                    <ArrowDown className={cx('down', 'btn')} />
                </div>
                <span className={cx('btn', 'volume-btn')} onClick={toggleMute}>
                    {isMuted ? <MuteIcon /> : <VolumeIcon />}

                    <div className={cx('volume-progress')} onClick={StopPropagation} onMouseDown={PreventDefault}>
                        <div ref={volumeBarRef} className={cx('volume-bar')} onMouseDown={handleVolumeChange}>
                            <div ref={volumeRef} className={cx('volume')}></div>
                        </div>
                    </div>
                </span>
            </div>
        </div>
    );
};

export default VideoSpace;

VideoSpace.propTypes = {
    data: PropTypes.object.isRequired,
};
