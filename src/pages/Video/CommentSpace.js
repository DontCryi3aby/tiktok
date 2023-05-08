import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';

import styles from './Video.module.scss';
import Button from '~/components/Button';
import {
    At,
    CommentIcon,
    EmbedIcon,
    Emoji,
    FacebookIcon,
    HeartIcon,
    LineIcon,
    MessageColorIcon,
    ShareIcon,
    Tick,
    TwitterIcon,
} from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/AccountPreview';
import * as userService from '~/services/userService';
import { isEmptyObj } from '~/store/GlobalFunction';
import { Context as globalContext } from '~/store/GlobalContext';
import { Context as authContext } from '~/store/AuthContext';
import Image from '~/components/Image';
import MusicTag from '~/components/MusicTag';
import CommentItem from './CommentItem';
import * as videoService from '~/services/videoService';

const cx = classNames.bind(styles);

const CommentSpace = ({ data: video }) => {
    // Get data from UserLoginContext
    const { currentUser } = useContext(globalContext);

    // Get data from AuthContext
    const { modalRef, ShowModal } = useContext(authContext);

    const [isFollowed, setIsFollowed] = useState(video.user.is_followed);
    const [inputValue, setInputValue] = useState('');

    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        const token = isEmptyObj(currentUser) ? '' : currentUser.meta.token;
        (async () => {
            const data = await videoService.getCommentsList({ id: video.id, token: token });
            setCommentsList(data);
        })();
    }, []);

    const renderPreview = (attrs) => (
        <div className={cx('preview')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <AccountPreview data={video.user} />
            </PopperWrapper>
        </div>
    );

    const handleFollow = async () => {
        if (!isEmptyObj(currentUser)) {
            if (!isFollowed) {
                await userService.follow({ id: video.user_id, token: currentUser.meta.token });
                setIsFollowed(true);
            } else {
                await userService.unfollow({ id: video.user_id, token: currentUser.meta.token });
                setIsFollowed(false);
            }
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('user')}>
                <header className={cx('header')}>
                    <Tippy
                        interactive
                        delay={[800, 0]}
                        placement="bottom-start"
                        offset={[-5, 0]}
                        render={renderPreview}
                    >
                        <div className={cx('info')}>
                            <div className={cx('avt')}>
                                <Image className={cx('avatar')} src={video.user.avatar} />
                            </div>
                            <div className={cx('desc')}>
                                <div>
                                    <div className={cx('name-wrapper')}>
                                        <div>
                                            <span className={cx('username')}>{video.user.nickname}</span>
                                            {video.user.tick && <Tick className={cx('tick')} />}
                                        </div>
                                        <div className={cx('wrap')}>
                                            <span
                                                className={cx('name')}
                                            >{`${video.user.first_name} ${video.user.last_name}`}</span>
                                            <span className={cx('dot')}></span>
                                            <span className={cx('time')}>{video.published_at.slice(0, 10)}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className={cx('caption')}>{video.user.description}</p>
                            </div>
                        </div>
                    </Tippy>

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
                </header>
                <p className={cx('caption')}>{video.description}</p>
                <MusicTag className={cx('tag')} label={video.music} />
                <div className={cx('actions')}>
                    <div className={cx('video-actions')}>
                        <div className={cx('action', 'like')}>
                            <HeartIcon className={cx('action-icon', { active: video.is_liked })} />
                            <span className={cx('value')}>{video.likes_count}</span>
                        </div>
                        <div className={cx('action')}>
                            <CommentIcon className={cx('action-icon')} />
                            <span className={cx('value')}>{video.comments_count}</span>
                        </div>
                        <div className={cx('action', 'share')}>
                            <ShareIcon className={cx('action-icon')} />
                            <span className={cx('value')}>{video.shares_count}</span>
                        </div>
                    </div>
                    <div className={cx('share-actions')}>
                        <EmbedIcon className={cx('share-action-icon')} />
                        <MessageColorIcon className={cx('share-action-icon')} />
                        <FacebookIcon className={cx('share-action-icon')} />
                        <LineIcon className={cx('share-action-icon')} />
                        <TwitterIcon className={cx('share-action-icon')} />
                    </div>
                </div>
                <div className={cx('link-video')}>
                    <p className={cx('link')}>{video.file_url}</p>
                    <p className={cx('copy-btn')}>Copy link</p>
                </div>
            </div>
            <div className={cx('comments-list')}>
                {commentsList.map((comment) => (
                    <CommentItem data={comment} key={comment.id} />
                ))}
            </div>
            <div className={cx('comment-fn')}>
                {isEmptyObj(currentUser) ? (
                    <div className={cx('comment-wrap', 'not-login')}>Log in to comment</div>
                ) : (
                    <>
                        <div className={cx('comment-wrap')}>
                            <input
                                value={inputValue}
                                className={cx('comment-input')}
                                placeholder="Add comment..."
                                spellCheck={false}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button className={cx('comment-icon')}>
                                <At />
                            </button>
                            <button className={cx('comment-icon')}>
                                <Emoji />
                            </button>
                        </div>
                        <div className={cx('post-btn')}>Post</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CommentSpace;

CommentSpace.propTypes = {
    data: PropTypes.object.isRequired,
};
