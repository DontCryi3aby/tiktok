import { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './LoginWays.module.scss';
import * as authService from '~/services/authService';
import { Context as userLoginContext } from '~/store/UserLoginContext';

const cx = classNames.bind(styles);

const LoginEmailForm = () => {
    // Get login state from UserLoginContext
    const { currentUserState } = useContext(userLoginContext);
    const [, setCurrentUser] = currentUserState;

    // State
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleLogin = async (username, password) => {
        const data = await authService.login(username, password);
        if (!data.errorCode) {
            setCurrentUser(data);
            console.log(data);
        } else {
            setCurrentUser({});
            console.log(data.errorCode);
        }
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
            <input
                value={passwordValue}
                id={styles.password}
                name="password"
                type="password"
                placeholder="Password"
                spellCheck={false}
                onChange={(e) => setPasswordValue(e.target.value)}
            />
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
