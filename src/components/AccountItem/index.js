import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://i.pinimg.com/564x/91/f8/d8/91f8d839f5b0cc5409cd13a34f486715.jpg"
                alt="avatar"
            />
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    <span>Hc_a_hT</span>
                    <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                </h4>
                <p className={cx('name')}>Nguyễn Ngọc Thạch</p>
            </div>
        </div>
    );
}

export default AccountItem;
