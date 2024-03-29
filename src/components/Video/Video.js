import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useContext, useState, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import Image from '~/components/Image';
import MusicTag from '~/components/MusicTag';
import ActionItem from '~/components/ActionItem';
import VideoCustom from './VideoCustom';
import styles from './Video.module.scss';
import { HeartIcon, CommentIcon, ShareIcon, Tick } from '~/components/Icons';
import { Context } from '~/store/AuthContext';
import { isEmptyObj } from '~/store/GlobalFunction';
import AccountPreview from '~/components/AccountPreview';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Context as globalContext } from '~/store/GlobalContext';
import * as userService from '~/services/userService';
import * as videoService from '~/services/videoService';

const cx = classNames.bind(styles);

function Video({ data, type = 'suggested', state }) {
    // Get data from AuthContext
    const { modalRef, ShowModal } = useContext(Context);

    // Get data from UserLoginContext
    const { currentUser, token } = useContext(globalContext);

    const [isFollowed, setIsFollowed] = useState(data.user.is_followed);
    const [isLiked, setIsLiked] = useState(data.is_liked);
    const [likesCount, setLikesCount] = useState(data.likes_count);

    useEffect(() => {
        setIsFollowed(data.user.is_followed);
    }, [data.user.is_followed]);

    const handleFollow = async () => {
        if (!isEmptyObj(currentUser)) {
            if (!isFollowed) {
                await userService.follow({ id: data.user_id, token: token });
                setIsFollowed(true);
            } else {
                await userService.unfollow({ id: data.user_id, token: token });
                setIsFollowed(false);
            }
        }
    };

    const handleLikeVideo = async () => {
        if (!isEmptyObj(currentUser)) {
            if (isLiked) {
                await videoService.unlikeAVideo({ id: data.id, token: token });
                setIsLiked(false);
                setLikesCount(likesCount - 1);
            } else {
                await videoService.likeAVideo({ id: data.id, token: token });
                setIsLiked(true);
                setLikesCount(likesCount + 1);
            }
        }
    };

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
                            <Link to={`/@${data.user.nickname}`}>
                                <Image className={cx('avatar')} src={data.user.avatar} />
                            </Link>
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
                                <Link to={`/@${data.user.nickname}`}>
                                    <div className={cx('user')}>
                                        <div>
                                            <span className={cx('username')}>{data.user.nickname}</span>
                                            {data.user.tick && <Tick className={cx('tick')} />}
                                        </div>
                                        <span
                                            className={cx('name')}
                                        >{`${data.user.first_name} ${data.user.last_name}`}</span>
                                    </div>
                                </Link>
                            </Tippy>
                        </div>
                        <p className={cx('caption')}>{data.description}</p>
                    </div>
                </div>
                {type === 'suggested' && (
                    <Button
                        className={cx('follow-btn')}
                        outline={!isFollowed}
                        small
                        onClick={() => {
                            isEmptyObj(currentUser) ? ShowModal(modalRef) : handleFollow();
                        }}
                    >
                        {isFollowed ? 'Following' : 'Follow'}
                    </Button>
                )}
            </header>
            <div className={cx('music-tag')}>
                <MusicTag className={cx('tag')} label={data.music} />
            </div>

            <div className={cx('video-wrapper')}>
                <VideoCustom data={data} state={state} />

                <div className={cx('actions')}>
                    <div className={cx('action-item')} onClick={handleLikeVideo}>
                        <ActionItem className={cx('action')} icon={<HeartIcon className={cx({ active: isLiked })} />} />
                        <span className={cx('value')}>{likesCount}</span>
                    </div>

                    <Link to={`/@${data.user.nickname}/video/${data.id}`}>
                        <div className={cx('action-item')}>
                            <ActionItem className={cx('action')} icon={<CommentIcon />} />
                            <span className={cx('value')}>{data.comments_count}</span>
                        </div>
                    </Link>

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
    type: PropTypes.string,
    state: PropTypes.array,
};

export default Video;
