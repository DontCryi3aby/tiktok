import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Image from '~/components/Image';
import MusicTag from '~/components/MusicTag';
import ActionItem from '~/components/ActionItem';
import VideoCustom from './VideoCustom';
import styles from './Video.module.scss';
import { HeartIcon, CommentIcon, ShareIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Video() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('info')}>
                    <Image
                        className={cx('avatar')}
                        src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/89d3263d56a69f77624adfdf1fb674ce~c5_100x100.jpeg?x-expires=1677297600&x-signature=vHP0sCuAHWpR%2BkrUEkTfO3SEjTM%3D"
                    />
                    <div className={cx('desc')}>
                        <div className={cx('user')}>
                            <h4 className={cx('username')}>nguyenngocthach</h4>
                            <span className={cx('name')}>Nguyễn Ngọc Thạch</span>
                        </div>
                        <p className={cx('caption')}>Em rảnh không?</p>
                    </div>
                </div>
                <Button outline small>
                    Follow
                </Button>
            </header>
            <div className={cx('music-tag')}>
                <MusicTag className={cx('tag')} label="Phía sau em" />
            </div>

            <div className={cx('video-wrapper')}>
                <VideoCustom />

                <div className={cx('actions')}>
                    <div className={cx('action-item')}>
                        <ActionItem className={cx('action')} icon={<HeartIcon />} />
                        <span className={cx('value')}>200.0K</span>
                    </div>

                    <div className={cx('action-item')}>
                        <ActionItem className={cx('action')} icon={<CommentIcon />} />
                        <span className={cx('value')}>200.0K</span>
                    </div>

                    <div className={cx('action-item')}>
                        <ActionItem className={cx('action')} icon={<ShareIcon />} />
                        <span className={cx('value')}>200.0K</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
