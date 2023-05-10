import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { Context as authContext } from '~/store/AuthContext';
import { Context as globalContext } from '~/store/GlobalContext';
import { isEmptyObj } from '~/store/GlobalFunction';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    // Get data from UserLoginContext
    const { currentUser } = useContext(globalContext);

    // Get data from AuthContext
    const { modalRef, ShowModal } = useContext(authContext);

    const [isFollowed, setIsFollowed] = useState(data.is_followed);

    const handleFollow = async () => {
        if (!isEmptyObj(currentUser)) {
            if (!isFollowed) {
                await userService.follow({ id: data.user_id, token: currentUser.meta.token });
                setIsFollowed(true);
            } else {
                await userService.unfollow({ id: data.user_id, token: currentUser.meta.token });
                setIsFollowed(false);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={`/@${data.nickname}`}>
                    <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                </Link>
                <Button
                    primary={!isFollowed}
                    className={cx('follow-btn')}
                    onClick={() => {
                        isEmptyObj(currentUser) ? ShowModal(modalRef) : handleFollow();
                    }}
                >
                    {isFollowed ? 'Following' : 'Follow'}
                </Button>
            </div>

            <div className={cx('desc')}>
                <Link to={`/@${data.nickname}`}>
                    <h4 className={cx('username')}>
                        <span>{data.nickname}</span>
                        {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                    </h4>
                    <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                </Link>

                <p className={cx('analytics')}>
                    <span className={cx('value')}>{data.followers_count}</span> Followers
                    <span className={cx('value')}>{data.likes_count}</span> Likes
                </p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
