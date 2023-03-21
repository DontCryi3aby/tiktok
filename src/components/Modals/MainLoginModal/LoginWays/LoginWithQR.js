import classNames from 'classnames/bind';

import styles from './LoginWays.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import { AddUser, RegisterQR } from '~/components/Icons';

const cx = classNames.bind(styles);

const LoginWithQR = () => {
    return (
        <div className={cx('qr-wrapper')}>
            <div className={cx('steps-wrapper')}>
                <Image className={cx('qr')} src={images.QRImage} />
                <div className={cx('steps')}>
                    <p className={cx('step')}>1. Open the TikTok app on your mobile device</p>
                    <p className={cx('step')}>
                        2. On Profile, tap{' '}
                        <span className={cx('add-user-icon')}>
                            <AddUser />
                        </span>
                    </p>
                    <p className={cx('step')}>
                        3. Tap{' '}
                        <span className={cx('register-qr-icon')}>
                            <RegisterQR />
                        </span>{' '}
                        and scan the QR code to confirm your login
                    </p>
                </div>
            </div>
            <div className={cx('animation')}>
                <Image className={cx('gif')} src={images.QRSteps} />
            </div>
        </div>
    );
};

export default LoginWithQR;
