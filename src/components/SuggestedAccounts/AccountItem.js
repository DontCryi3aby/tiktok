import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './SuggestedAccounts.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <Link to={`/@thach`} className={cx('account-item')}>
            <Image
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/45819ddf6526367017c64f74853a6c53~c5_100x100.jpeg?x-expires=1676890800&x-signature=y%2BSxNTjRS1UgTRDpKY4x0XqJsZY%3D"
                alt=""
            />
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    <span>nguyenngocthach</span>
                    <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                </h4>
                <p className={cx('name')}>Nguyễn Ngọc Thạch</p>
            </div>
        </Link>
    );
}
export default AccountItem;
