import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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

    const { ref, inView } = useInView();
    useEffect(() => {
        if (inView) {
            setPage(page + 1);
            (async () => {
                const data = await videoService.getVideosList({ type: 'for-you', page: page });
                setVideosList((prev) => [...prev, ...data]);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return (
        <VideoContext value={contextValue}>
            <div className={styles.wrapper}>
                {videosList.map((video) => (
                    <Video key={video.id} data={video} />
                ))}
                <div ref={ref}></div>
            </div>
        </VideoContext>
    );
}

export default Home;
