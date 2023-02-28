import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import styles from './MainModal.module.scss';
import {
    CloseIcon,
    QRIcon,
    UserIcon,
    FacebookIcon,
    GoogleIcon,
    TwitterIcon,
    LineIcon,
    KakaoTalkIcon,
    AppleIcon,
    InstagramIcon,
} from '~/components/Icons';
import LoginItem from './LoginItem';
import { Context } from '~/store/AuthContext';

const cx = classNames.bind(styles);

const LOGIN_WAYS = [
    {
        icon: QRIcon,
        label: 'Use QR Code',
    },
    {
        icon: UserIcon,
        label: 'Use phone / email / username',
    },
    {
        icon: FacebookIcon,
        label: 'Continue with Facebook',
    },
    {
        icon: GoogleIcon,
        label: 'Continue with Google',
    },
    {
        icon: TwitterIcon,
        label: 'Continue with Twitter',
    },
    {
        icon: LineIcon,
        label: 'Continue with LINE',
    },
    {
        icon: KakaoTalkIcon,
        label: 'Continue with KakaoTalk',
    },
    {
        icon: AppleIcon,
        label: 'Continue with Apple',
    },
    {
        icon: InstagramIcon,
        label: 'Continue with Instagram',
    },
];

const SIGNUP_WAYS = [
    {
        icon: UserIcon,
        label: 'Use phone or email',
    },
    {
        icon: FacebookIcon,
        label: 'Continue with Facebook',
    },
    {
        icon: GoogleIcon,
        label: 'Continue with Google',
    },
];

const MainModal = () => {
    const [isLoginDisplay, setIsLoginDisplay] = useState(true);

    // Get data from AuthContext
    const { modalRef, HideModal } = useContext(Context);

    const List = isLoginDisplay ? LOGIN_WAYS : SIGNUP_WAYS;

    const toggleBtn = () => {
        setIsLoginDisplay(!isLoginDisplay);
    };

    const closeModal = () => {
        HideModal(modalRef);
        setIsLoginDisplay(true);
    };

    const classes = `${cx('modal')} hide`;

    return (
        <div className={classes} ref={modalRef}>
            <div className={cx('modal-inner')}>
                <button className={cx('close-btn')} onClick={closeModal}>
                    <CloseIcon className={cx('close-icon')} />
                </button>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>{isLoginDisplay ? 'Log in to TikTok' : 'Sign up for Tiktok'}</h3>
                    <div>
                        {List.map((item, index) => (
                            <LoginItem
                                className={cx('login-item')}
                                key={index}
                                icon={<item.icon />}
                                label={item.label}
                            />
                        ))}
                    </div>
                    {!isLoginDisplay && (
                        <p className={cx('confirm')}>
                            By continuing, you agree to TikTok’s <span className={cx('bold')}>Terms of Service</span>{' '}
                            and confirm that you have read <span className={cx('bold')}>TikTok’s Privacy Policy</span>
                        </p>
                    )}
                </div>
                <div className={cx('footer')}>
                    <span>{isLoginDisplay ? "Don't have an account?" : 'Already have an account?'}</span>
                    <span className={cx('btn')} onClick={toggleBtn}>
                        {isLoginDisplay ? 'Sign up' : 'Log in'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MainModal;
