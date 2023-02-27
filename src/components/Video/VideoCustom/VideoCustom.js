import PropTypes from 'prop-types';
import { useEffect, useRef, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import { useInView } from 'react-intersection-observer';

import styles from './VideoCustom.module.scss';
import { PlayIcon, PauseIcon, VolumeIcon, MuteIcon } from '~/components/Icons';
import { Context } from '~/store/VideoContext';
import { StopPropagation, PreventDefault } from '~/store/GlobalFunction';

const cx = classNames.bind(styles);

function VideoCustom({ data }) {
    // Get data from VideoContext
    const { volumeState, mutedState, inViewVideosArrState, priorityVideoState } = useContext(Context);
    // let { priorityVideoI } = useContext(Context);

    // State context
    const [volume, setVolume] = volumeState;
    const [isMuted, setIsMuted] = mutedState;
    // const [priorityVideo, setPriorityVideo] = priorityVideoState;
    // const [inViewVideosArr, setInViewVideosArr] = inViewVideosArrState;

    // State
    const [isPlaying, setIsPlaying] = useState(true);

    const { ref, inView } = useInView({
        threshold: 0.59,
    });

    // Ref
    const videoRef = useRef();
    const volumeBarRef = useRef();
    const volumeRef = useRef();

    // Change data to Camel Case
    const {
        file_url: fileUrl,
        meta: {
            video: { resolution_x: videoWidth, resolution_y: videoHeight },
        },
    } = data;
    const shapeOfVideo = videoWidth > videoHeight ? 'horizontal' : 'vertical';

    useEffect(() => {
        if (inView) {
            if (!isPlaying) {
                videoRef.current.play();
                setIsPlaying(true);
            }
        } else {
            if (isPlaying) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                setIsPlaying(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

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
        <div className={cx('wrapper', shapeOfVideo)} ref={ref}>
            <video ref={videoRef} width={videoWidth} height={videoHeight} className={cx('video')} src={fileUrl} loop />
            <div className={cx('controls')}>
                <span className={cx('control', 'play-btn')} onClick={togglePlay}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </span>
                <span className={cx('control', 'volume-btn', { mute: isMuted })} onClick={toggleMute}>
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
}

VideoCustom.propTypes = {
    data: PropTypes.object.isRequired,
};

export default VideoCustom;
