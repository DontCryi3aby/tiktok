import classNames from 'classnames/bind';
import { useEffect, useState, useContext, useRef } from 'react';
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
    const { currentUser, token: bearerToken } = useContext(globalContext);

    // Get data from AuthContext
    const { modalRef, ShowModal } = useContext(authContext);

    const [isFollowed, setIsFollowed] = useState(video.user.is_followed);
    const [inputValue, setInputValue] = useState('');

    const [commentsList, setCommentsList] = useState([]);
    const [isLiked, setIsLiked] = useState(video.is_liked);
    const [likesCount, setLikesCount] = useState(video.likes_count);
    const [commentsCount, setCommentsCount] = useState(video.comments_count);

    const commentInputRef = useRef();

    useEffect(() => {
        (async () => {
            const fakeToken =
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY4MzUyOTU5MSwiZXhwIjoxNjg2MTIxNTkxLCJuYmYiOjE2ODM1Mjk1OTEsImp0aSI6IkxVMEt6SUFtTm9mTENXTGsiLCJzdWIiOjQ5NzMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.w7TYgPLDISSaSwFw_3OKzsL6mUtzOZLd0WVsDlbVyP0';
            const token = isEmptyObj(currentUser) ? fakeToken : bearerToken;
            const data = await videoService.getCommentsList({ id: video.id, token });
            setCommentsList(data);
        })();
    }, [video.id, currentUser, bearerToken]);

    const handleLikeVideo = async () => {
        if (!isEmptyObj(currentUser)) {
            if (isLiked) {
                await videoService.unlikeAVideo({ id: video.id, token: bearerToken });
                setIsLiked(false);
                setLikesCount(likesCount - 1);
            } else {
                await videoService.likeAVideo({ id: video.id, token: bearerToken });
                setIsLiked(true);
                setLikesCount(likesCount + 1);
            }
        }
    };

    const handleComment = async () => {
        if (!isEmptyObj(currentUser)) {
            const data = await userService.comment({
                id: video.id,
                token: bearerToken,
                comment: inputValue,
            });
            setCommentsList((prev) => [data, ...prev]);
            setCommentsCount(commentsCount + 1);
            setInputValue('');
            commentInputRef.current.focus();
        }
    };

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
                await userService.follow({ id: video.user_id, token: bearerToken });
                setIsFollowed(true);
            } else {
                await userService.unfollow({ id: video.user_id, token: bearerToken });
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
                        <div className={cx('action', 'like')} onClick={handleLikeVideo}>
                            <HeartIcon className={cx('action-icon', { active: isLiked })} />
                            <span className={cx('value')}>{likesCount}</span>
                        </div>
                        <div className={cx('action')}>
                            <CommentIcon className={cx('action-icon')} />
                            <span className={cx('value')}>{commentsCount}</span>
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
                    <div className={cx('comment-wrap', 'not-login')} onClick={() => ShowModal(modalRef)}>
                        Log in to comment
                    </div>
                ) : (
                    <>
                        <div className={cx('comment-wrap')}>
                            <input
                                ref={commentInputRef}
                                value={inputValue}
                                className={cx('comment-input')}
                                placeholder="Add comment..."
                                spellCheck={false}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (!input.startsWith(' ')) {
                                        setInputValue(input);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    switch (e.code) {
                                        case 'Enter':
                                            handleComment();
                                            break;
                                        default:
                                    }
                                }}
                            />
                            <button className={cx('comment-icon')}>
                                <At />
                            </button>
                            <button className={cx('comment-icon')}>
                                <Emoji />
                            </button>
                        </div>
                        <div className={cx('post-btn', { active: !!inputValue.trim() })} onClick={handleComment}>
                            Post
                        </div>
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
