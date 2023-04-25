import { useEffect, useState, useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames/bind';

import { Context as globalContext } from '~/store/GlobalContext';
import * as videoService from '~/services/videoService';
import styles from './Following.module.scss';
import DefaultPage from './DefaultPage';
import { isEmptyObj } from '~/store/GlobalFunction';
import Video from '~/components/Video';

const cx = classNames.bind(styles);

function Following() {
    // Get data from UserLoginContext
    const { currentUser } = useContext(globalContext);

    const [page, setPage] = useState(1);

    const [followingVideoList, setFollowingVideoList] = useState([]);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            setPage(page + 1);
            // IIFE
            (async () => {
                if (!isEmptyObj(currentUser)) {
                    const data = await videoService.getVideosList({
                        type: 'following',
                        page: page,
                        token: currentUser.meta.token,
                    });
                    setFollowingVideoList((prev) => [...prev, ...data]);
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {isEmptyObj(currentUser) ? (
                    <DefaultPage />
                ) : (
                    <>
                        {followingVideoList.map((video) => (
                            <Video key={video.id} data={video} type="following" />
                        ))}
                        <div ref={ref}></div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Following;
