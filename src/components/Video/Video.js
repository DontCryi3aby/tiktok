import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Image from '~/components/Image';
import MusicTag from '~/components/MusicTag';
import ActionItem from '~/components/ActionItem';
import VideoCustom from './VideoCustom';
import styles from './Video.module.scss';
import { HeartIcon, CommentIcon, ShareIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Video({ data }) {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('info')}>
                    <Image className={cx('avatar')} src={data.user.avatar} />
                    <div className={cx('desc')}>
                        <div className={cx('user')}>
                            <h4 className={cx('username')}>{data.user.nickname}</h4>
                            <span className={cx('name')}>{`${data.user.first_name} ${data.user.last_name}`}</span>
                        </div>
                        <p className={cx('caption')}>{data.description}</p>
                    </div>
                </div>
                <Button className={cx('follow-btn')} outline small>
                    Follow
                </Button>
            </header>
            <div className={cx('music-tag')}>
                <MusicTag className={cx('tag')} label={data.music} />
            </div>

            <div className={cx('video-wrapper')}>
                <VideoCustom data={data} />

                <div className={cx('actions')}>
                    <div className={cx('action-item')}>
                        <ActionItem className={cx('action')} icon={<HeartIcon />} />
                        <span className={cx('value')}>{data.likes_count}</span>
                    </div>

                    <div className={cx('action-item')}>
                        <ActionItem className={cx('action')} icon={<CommentIcon />} />
                        <span className={cx('value')}>{data.comments_count}</span>
                    </div>

                    <div className={cx('action-item')}>
                        <ActionItem className={cx('action')} icon={<ShareIcon />} />
                        <span className={cx('value')}>{data.shares_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Video;
