import PropTypes from 'prop-types';
import { useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { Context as authContext } from '~/store/AuthContext';
import { Context as userLoginContext } from '~/store/UserLoginContext';
import { defaultFn, isEmptyObj } from '~/store/GlobalFunction';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    // Get data from UserLoginContext
    const { currentUser } = useContext(userLoginContext);

    // Get data from AuthContext
    const { modalRef, ShowModal } = useContext(authContext);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                <Button
                    primary
                    className={cx('follow-btn')}
                    onClick={() => {
                        !isEmptyObj(currentUser) ? ShowModal(modalRef) : defaultFn();
                    }}
                >
                    Follow
                </Button>
            </div>

            <div className={cx('desc')}>
                <h4 className={cx('username')}>
                    <span>{data.nickname}</span>
                    {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                </h4>
                <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>

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
