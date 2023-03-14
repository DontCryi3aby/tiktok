import classNames from 'classnames/bind';
import styles from './LoginWay.module.scss';

const cx = classNames.bind(styles);

const LoginWithEmail = () => {
    return <div className={cx('wrapper')}>LOGIN WITH QR</div>;
};

export default LoginWithEmail;
