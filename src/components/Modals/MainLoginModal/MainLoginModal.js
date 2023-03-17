import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import styles from './MainLoginModal.module.scss';
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
    BackIcon,
} from '~/components/Icons';
import LoginItem from './LoginItem';
import { Context } from '~/store/AuthContext';
import LoginWithEmail from './LoginWays/LoginWithEmail';
import LoginWithQR from './LoginWays/LoginWithQR';
import { Context as userLoginContext } from '~/store/UserLoginContext';
import { isEmptyObj } from '~/store/GlobalFunction';

const cx = classNames.bind(styles);

const MODAL_LOGIN_DATA = {
    title: 'Log in to TikTok',
    data: [
        {
            icon: QRIcon,
            label: 'Use QR Code',
            children: {
                title: 'Log in with QR code',
                type: 'component',
                data: LoginWithQR,
            },
        },
        {
            icon: UserIcon,
            label: 'Use phone / email / username',
            children: {
                title: 'Log in',
                type: 'component',
                data: LoginWithEmail,
            },
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
    ],
};

const MODAL_SIGNUP_DATA = {
    title: 'Sign up for Tiktok',
    data: [
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
    ],
};

const MainModal = () => {
    // Get data from AuthContext
    const { modalRef, HideModal } = useContext(Context);

    // Get login state from UserLoginContext
    const { currentUserState } = useContext(userLoginContext);
    const [currentUser] = currentUserState;

    const [isLoginDisplay, setIsLoginDisplay] = useState(true);

    const [history, setHistory] = useState([MODAL_LOGIN_DATA]);
    const currentTab = history[history.length - 1];

    useEffect(() => {
        const List = isLoginDisplay ? MODAL_LOGIN_DATA : MODAL_SIGNUP_DATA;
        setHistory([List]);
    }, [isLoginDisplay, currentUser]);

    useEffect(() => {
        if (!isEmptyObj(currentUser)) {
            HideModal(modalRef);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const toggleBtn = () => {
        setIsLoginDisplay(!isLoginDisplay);
    };

    const closeModal = () => {
        HideModal(modalRef);
        setIsLoginDisplay(true);
        setHistory([history[0]]);
    };

    const classes = `${cx('modal')} hide`;

    const backToMain = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    return (
        <div className={classes} ref={modalRef}>
            <div className={cx('modal-inner')}>
                {history.length > 1 && (
                    <button className={cx('back-btn')} onClick={backToMain}>
                        <BackIcon className={cx('close-icon')} />
                    </button>
                )}
                <button className={cx('close-btn')} onClick={closeModal}>
                    <CloseIcon className={cx('close-icon')} />
                </button>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>{currentTab.title}</h3>
                    {currentTab.type === 'component' ? (
                        <currentTab.data />
                    ) : (
                        <div>
                            {currentTab.data.map((item, index) => (
                                <LoginItem
                                    className={cx('login-item')}
                                    key={index}
                                    icon={<item.icon />}
                                    label={item.label}
                                    onClick={() => {
                                        const isParent = !!item.children;
                                        if (isParent) {
                                            setHistory((prev) => [...prev, item.children]);
                                        } else {
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    )}

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
