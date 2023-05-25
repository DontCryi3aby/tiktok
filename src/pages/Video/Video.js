import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import styles from './Video.module.scss';
import * as videoService from '~/services/videoService';
import { isEmptyObj } from '~/store/GlobalFunction';
import { Context } from '~/store/GlobalContext';
import VideoSpace from './VideoSpace';
import CommentSpace from './CommentSpace';

const cx = classNames.bind(styles);

const Video = () => {
    const { id } = useParams();
    const [video, setVideo] = useState({});

    const { currentUser, token: bearerToken } = useContext(Context);

    useEffect(() => {
        (async () => {
            const token = !isEmptyObj(currentUser) ? bearerToken : '';
            const data = await videoService.getAVideo({ id, token });
            setVideo(data);
        })();
    }, [currentUser, id, bearerToken]);

    return (
        <div className={cx('wrapper')}>
            {!isEmptyObj(video) && (
                <>
                    <VideoSpace data={video} />
                    <CommentSpace data={video} />
                </>
            )}
        </div>
    );
};

export default Video;
