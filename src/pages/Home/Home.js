import { useEffect, useState, useContext } from 'react';
import { useInView } from 'react-intersection-observer';

import Video from '~/components/Video';
import styles from './Home.module.scss';
import VideoContext from '~/store/VideoContext';
import * as videoService from '~/services/videoService';
import { Context } from '~/store/GlobalContext';

function Home() {
    // State
    const [videosList, setVideosList] = useState([]);
    const [page, setPage] = useState(1);

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
        <div className={styles.wrapper}>
            {videosList.map((video) => (
                <Video key={video.id} data={video} />
            ))}
            <div ref={ref}></div>
        </div>
    );
}

export default Home;
