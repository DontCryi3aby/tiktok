import classNames from 'classnames/bind';
import styles from './DefaultPage.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

export const VideoItem = ({ data: user }) => {
    return (
        <div className={cx('video-item')}>
            <video className={cx('video')} src={user.popular_video.file_url} />
            <div className={cx('user')}>
                <Image src={user.avatar} alt={user.nickname} className={cx('avatar')} />
                <h3 className={cx('name')}>{`${user.first_name} ${user.last_name}`}</h3>
                <p className={cx('username')}>
                    <span>{user.nickname}</span>
                    {user.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                </p>
                <Button primary className={cx('button')}>
                    Follow
                </Button>
            </div>
        </div>
    );
};

const DefaultPage = () => {
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await userService.getSuggested({ page: 1, perPage: 10 });
            setListUsers((prev) => [...prev, ...data]);
        })();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {listUsers.map((user) => (
                <VideoItem data={user} key={user.id} />
            ))}
        </div>
    );
};

export default DefaultPage;
