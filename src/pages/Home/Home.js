import { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';

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

    // State
    const [videosList, setVideosList] = useState([]);
    const [page, setPage] = useState(1);

    // Provide value to VideoContext
    const contextValue = {
        volumeState: [volume, setVolume],
        mutedState: [isMuted, setIsMuted],
        inViewVideosArrState: [inViewVideosArr, setInViewVideosArr],
        priorityVideoState: [priorityVideo, setPriorityVideo],
    };

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await videoService.getVideosList({ type: 'for-you', page: page });
            if (data) {
                setVideosList((prev) => [...prev, ...data]);
            } else {
                return;
            }
        };
        fetchAPI();
    }, [page]);

    return (
        <VideoContext value={contextValue}>
            <div className={styles.wrapper}>
                {videosList.map((video) => (
                    <Video key={video.id} data={video} />
                ))}
                <InView as="div" onChange={(inView, entry) => setPage(page + 1)}></InView>
            </div>
        </VideoContext>
    );
}

export default Home;
