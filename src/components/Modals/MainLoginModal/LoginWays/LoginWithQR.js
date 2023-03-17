import classNames from 'classnames/bind';
import styles from './LoginWays.module.scss';

const cx = classNames.bind(styles);

const LoginWithQR = () => {
    return <div className={cx('wrapper')}>LOGIN WITH QR</div>;
};

export default LoginWithQR;
