import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import Tippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import Image from '~/components/Image';
import MusicTag from '~/components/MusicTag';
import ActionItem from '~/components/ActionItem';
import VideoCustom from './VideoCustom';
import styles from './Video.module.scss';
import { HeartIcon, CommentIcon, ShareIcon } from '~/components/Icons';
import { Context } from '~/store/AuthContext';
import { defaultFn } from '~/store/GlobalFunction';
import AccountPreview from '~/components/AccountPreview';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Video({ data }) {
    // Get data from AuthContext
    const { modalRef, ShowModal } = useContext(Context);

    // Fake user login
    const currentUser = false;

    const renderPreview = (attrs) => (
        <div className={cx('preview')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <AccountPreview data={data.user} />
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('info')}>
                    <div className={cx('avt')}>
                        <Tippy
                            interactive
                            delay={[800, 0]}
                            placement="bottom-start"
                            offset={[-5, 0]}
                            render={renderPreview}
                        >
                            <Image className={cx('avatar')} src={data.user.avatar} />
                        </Tippy>
                    </div>
                    <div className={cx('desc')}>
                        <div>
                            <Tippy
                                interactive
                                delay={[800, 0]}
                                placement="bottom"
                                offset={[-5, 30]}
                                render={renderPreview}
                            >
                                <div className={cx('user')}>
                                    <h4 className={cx('username')}>{data.user.nickname}</h4>
                                    <span
                                        className={cx('name')}
                                    >{`${data.user.first_name} ${data.user.last_name}`}</span>
                                </div>
                            </Tippy>
                        </div>
                        <p className={cx('caption')}>{data.description}</p>
                    </div>
                </div>
                <Button
                    className={cx('follow-btn')}
                    outline
                    small
                    onClick={() => {
                        !currentUser ? ShowModal(modalRef) : defaultFn();
                    }}
                >
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
