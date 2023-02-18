import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image
                    className={cx('avatar')}
                    src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/45819ddf6526367017c64f74853a6c53~c5_100x100.jpeg?x-expires=1676890800&x-signature=y%2BSxNTjRS1UgTRDpKY4x0XqJsZY%3D"
                    alt=""
                />
                <Button primary className={cx('follow-btn')}>
                    Follow
                </Button>
            </div>

            <div className={cx('desc')}>
                <h4 className={cx('username')}>
                    <span>nguyenngocthach</span>
                    <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                </h4>
                <p className={cx('name')}>Nguyen Ngoc Thach</p>

                <p className={cx('analytics')}>
                    <span className={cx('value')}>2.4M</span> Followers
                    <span className={cx('value')}>240.3M</span> Likes
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
