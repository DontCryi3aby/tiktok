import classNames from 'classnames/bind';
import styles from './DefaultPage.module.scss';
import VideoItem from './VideoItem';
import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

const DefaultPage = () => {
    const [listUsers, setListUsers] = useState([]);

    // fetch API
    useEffect(() => {
        (async () => {
            const data = await userService.getSuggested({ page: 1, perPage: 10 });
            setListUsers((prev) => [...prev, ...data]);
        })();
    }, []);

    const [videoPlay, setVideoPlay] = useState();

    // Handle play video
    useEffect(() => {
        if (videoPlay) {
            videoPlay.play();
        }
        return () => {
            if (videoPlay) {
                videoPlay.pause();
                videoPlay.currentTime = 0;
            }
        };
    }, [videoPlay]);

    return (
        <div className={cx('wrapper')}>
            {listUsers.map((user) => (
                <VideoItem state={[videoPlay, setVideoPlay]} data={user} key={user.id} />
            ))}
        </div>
    );
};

export default DefaultPage;
