import classNames from 'classnames/bind';
import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Video.module.scss';
import Image from '~/components/Image';
import { Tick, HeartBorder, HeartIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const CommentItem = ({ data: comment }) => {
    const [isLiked, setIsLiked] = useState(false);

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
                    <div className={cx('like-icon')}>
                        {isLiked ? (
                            <HeartIcon className={cx('heart-icon')} />
                        ) : (
                            <HeartBorder className={cx('heart-icon')} />
                        )}
                        <span className={cx('likes-count')}>{comment.likes_count}</span>
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
