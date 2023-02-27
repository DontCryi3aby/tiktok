import { useEffect, useState } from 'react';

import Video from '~/components/Video';
import styles from './Home.module.scss';
import VideoContext from '~/store/VideoContext';
import * as videoService from '~/services/videoService';

function Home() {
    // State provide value context
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(true);
    const [inViewVideosArr, setInViewVideosArr] = useState([]);
    const [priorityVideo, setPriorityVideo] = useState({});
    let priorityVideoI = {};

    // State
    const [videosList, setVideosList] = useState([]);

    // Provide value to VideoContext
    const contextValue = {
        volumeState: [volume, setVolume],
        mutedState: [isMuted, setIsMuted],
        inViewVideosArrState: [inViewVideosArr, setInViewVideosArr],
        priorityVideoState: [priorityVideo, setPriorityVideo],
        priorityVideoI,
    };

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await videoService.getVideosList({ type: 'for-you', page: 2 });
            setVideosList(data);
        };
        fetchAPI();
    }, []);

    return (
        <VideoContext value={contextValue}>
            <div className={styles.wrapper}>
                {videosList.map((video) => (
                    <Video key={video.id} data={video} />
                ))}
            </div>
        </VideoContext>
    );
}

export default Home;
