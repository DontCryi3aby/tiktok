import { useEffect, useRef, useState, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './VideoCustom.module.scss';
import { PlayIcon, PauseIcon, VolumeIcon, MuteIcon } from '~/components/Icons';
// import Context from '~/store/Context';

const cx = classNames.bind(styles);

function VideoCustom() {
    // const [VolumeGlobal, setVolumeGlobal] = useContext(Context);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isHoldMouse, setIsHoldMouse] = useState(false);

    const videoRef = useRef();
    const volumeBarRef = useRef();
    const volumeRef = useRef();
    const currentVolume = useRef(0.6);

    const handlePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        videoRef.current.volume = currentVolume.current;
    }, []);

    useEffect(() => {
        if (isMuted) {
            videoRef.current.volume = 0;
        } else {
            videoRef.current.volume = currentVolume.current;
        }
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = () => {
        volumeRef.current.style.height = videoRef.current.volume * 100 + '%';
    };

    const handleMouseDown = (e) => {
        setIsHoldMouse(true);
        const begin = volumeBarRef.current.getBoundingClientRect().y;
        const height = volumeBarRef.current.clientHeight;
        const cur = e.clientY + 1;
        const end = Math.floor(begin + height);

        if (cur >= 0 && cur <= end) {
            currentVolume.current = (end - cur) / height;
            videoRef.current.volume = currentVolume.current;
            videoRef.current.volume === 0 ? setIsMuted(true) : setIsMuted(false);
        }
    };

    const handleMouseMove = (e) => {
        if (isHoldMouse) {
            const begin = volumeBarRef.current.getBoundingClientRect().y;
            const height = volumeBarRef.current.clientHeight;
            const cur = e.clientY + 1;
            const end = Math.floor(begin + height);

            if (cur >= 0 && cur <= end) {
                currentVolume.current = (end - cur) / height;
                videoRef.current.volume = currentVolume.current;
                videoRef.current.volume === 0 ? setIsMuted(true) : setIsMuted(false);
            }
        }
    };

    const stopPropagationFn = (e) => {
        e.stopPropagation();
    };

    window.onmouseup = function () {
        setIsHoldMouse(false);
    };

    return (
        <>
            <video
                ref={videoRef}
                className={cx('video')}
                src="https://files.fullstack.edu.vn/f8-tiktok/videos/833-6371c4f5d25cf.mp4"
                loop
                autoPlay={false}
                onVolumeChange={handleVolumeChange}
            />
            <div className={cx('controls')}>
                <span className={cx('control', 'play-btn')} onClick={handlePlay}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </span>
                <span className={cx('control', 'volume-btn')} onClick={toggleMute}>
                    {isMuted ? <MuteIcon /> : <VolumeIcon />}
                    <div className={cx('volume-progress')} onClick={stopPropagationFn}>
                        <div
                            ref={volumeBarRef}
                            className={cx('volume-bar')}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                        >
                            <div ref={volumeRef} className={cx('volume')}></div>
                        </div>
                    </div>
                </span>
            </div>
        </>
    );
}

export default VideoCustom;
