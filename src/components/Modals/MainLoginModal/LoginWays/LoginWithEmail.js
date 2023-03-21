import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './LoginWays.module.scss';
import * as authService from '~/services/authService';
import { reloadPage } from '~/store/GlobalFunction';
import { EyeClose, EyeOpen } from '~/components/Icons';

const cx = classNames.bind(styles);

const LoginEmailForm = () => {
    const passwordRef = useRef();

    // State
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleLogin = async (username, password) => {
        const data = await authService.login(username, password);
        if (data.errorCode) {
            passwordRef.current.classList.add(cx('wrong-password'));
        } else {
            localStorage.setItem('user', JSON.stringify(data));
            reloadPage();
        }
    };

    const handleInputPassword = (e) => {
        passwordRef.current.classList.remove(cx('wrong-password'));
        setPasswordValue(e.target.value);
    };

    return (
        <div>
            <input
                value={usernameValue}
                id={styles.username}
                name="username"
                type="text"
                placeholder="Email or username"
                spellCheck={false}
                onChange={(e) => setUsernameValue(e.target.value)}
            />
            <div className={cx('password-wrapper')}>
                <div className={cx('password')} ref={passwordRef}>
                    <input
                        value={passwordValue}
                        id={styles.password}
                        name="password"
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder="Password"
                        spellCheck={false}
                        onChange={handleInputPassword}
                    />
                    <button className={cx('eye-btn')} onClick={() => setIsShowPassword(!isShowPassword)}>
                        {isShowPassword ? <EyeOpen /> : <EyeClose />}
                    </button>
                </div>
                <span className={cx('wrong-message')}>Incorrect username or password</span>
            </div>
            <span className={cx('forgot-btn')}>Forgot password?</span>
            <Button
                primary
                className={cx('login-btn', {
                    disabled: !usernameValue || !passwordValue,
                })}
                onClick={() => handleLogin(usernameValue, passwordValue)}
            >
                Log in
            </Button>
        </div>
    );
};

const LoginPhoneForm = () => {
    return (
        <div>
            <div className={cx('phone-form-group')}>
                <div className={cx('local-phone')}>
                    <span>VN +84</span>
                    <FontAwesomeIcon icon={faSortDown} className={cx('down-icon')} />
                </div>
                <input id={styles.phone} name="phone" type="text" placeholder="Phone number" spellCheck={false} />
            </div>
            <div className={cx('phone-form-group')}>
                <input id={styles.code} name="code" type="text" placeholder="Enter 6-digit code" />
                <button className={cx('send-code-btn')}>Send code</button>
            </div>
            <span className={cx('change-login-btn')}>Log in with password</span>
            <Button primary className={cx('login-btn', 'disabled')}>
                Log in
            </Button>
        </div>
    );
};

const LoginWithEmail = () => {
    const [isLoginWithEmail, setIsLoginWithEmail] = useState(true);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>
                <span className={cx('main-title')}>{isLoginWithEmail ? 'Email or username' : 'Phone'}</span>
                <span className={cx('sub-title')} onClick={() => setIsLoginWithEmail(!isLoginWithEmail)}>
                    {isLoginWithEmail ? 'Log in with phone' : 'Log in with email or username'}
                </span>
            </p>
            {isLoginWithEmail ? <LoginEmailForm /> : <LoginPhoneForm />}
        </div>
    );
};

export default LoginWithEmail;
