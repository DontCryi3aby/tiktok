import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Video.module.scss';
import Image from '~/components/Image';
import { Tick, HeartBorder, HeartIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const CommentItem = ({ data: comment }) => {
    const [isLiked, setIsLiked] = useState(comment.is_liked);
    const [likesCount, setLikesCount] = useState(comment.likes_count);

    const handleLikeComment = async () => {
        if (isLiked) {
            setIsLiked(false);
            setLikesCount(likesCount - 1);
        } else {
            setIsLiked(true);
            setLikesCount(likesCount + 1);
        }
    };

    return (
        <div className={cx('comment-item')}>
            <Image className={cx('comment-user-avatar')} src={comment.user.avatar} alt={comment.user.nickname} />
            <div className={cx('comment-space')}>
                <p>
                    <span
                        className={cx('comment-user-name')}
                    >{`${comment.user.first_name} ${comment.user.last_name}`}</span>
                    {comment.user.tick && <Tick className={cx('tick')} />}
                </p>
                <div className={cx('comment-wrapper')}>
                    <p className={cx('comment')}>{comment.comment}</p>
                    <div className={cx('like-icon')} onClick={handleLikeComment}>
                        {isLiked ? (
                            <HeartIcon className={cx('heart-icon', 'active')} />
                        ) : (
                            <HeartBorder className={cx('heart-icon')} />
                        )}
                        <span className={cx('likes-count')}>{likesCount}</span>
                    </div>
                </div>
                <p className={cx('reply')}>
                    <span className={cx('time-comment')}>{comment.created_at.slice(0, 10)}</span>
                    <span className={cx('reply-btn')}>Reply</span>
                </p>
            </div>
        </div>
    );
};

export default CommentItem;

CommentItem.propTypes = {
    data: PropTypes.object.isRequired,
};
