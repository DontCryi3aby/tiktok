import classNames from 'classnames/bind';
import styles from './DefaultLiveLoading.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function DefaultLiveLoading() {
    return (
        <div className={cx('container')}>
            <div className={cx('inner')}>
                <h3 className={cx('title')}>No LIVE videos for you yet</h3>
                <p className={cx('instruction')}>Go back to explore more videos</p>
                <Link to={config.routes.home} className={cx('btn')}>
                    Go back
                </Link>
            </div>
        </div>
    );
}

export default DefaultLiveLoading;
