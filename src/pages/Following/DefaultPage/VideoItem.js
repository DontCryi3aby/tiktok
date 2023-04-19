import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import { Context as authContext } from '~/store/AuthContext';
import Image from '~/components/Image';
import styles from './DefaultPage.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

const VideoItem = ({ data: user, state }) => {
    // Get data from AuthContext
    const { modalRef, ShowModal } = useContext(authContext);

    const [, setVideoPlay] = state;

    const handlePlayVideo = () => {
        setVideoPlay(videoRef.current);
    };

    const videoRef = useRef();

    return (
        <Link to={`/@${user.nickname}`} className={cx('video-item')} onMouseOver={handlePlayVideo}>
            <video ref={videoRef} muted className={cx('video')} src={user.popular_video.file_url} />
            <div className={cx('user')}>
                <Image src={user.avatar} alt={user.nickname} className={cx('avatar')} />
                <h3 className={cx('name')}>{`${user.first_name} ${user.last_name}`}</h3>
                <p className={cx('username')}>
                    <span>{user.nickname}</span>
                    {user.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                </p>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        ShowModal(modalRef);
                    }}
                    primary
                    className={cx('button')}
                >
                    Follow
                </Button>
            </div>
        </Link>
    );
};

VideoItem.propTypes = {
    data: PropTypes.object.isRequired,
    state: PropTypes.array,
};

export default VideoItem;
