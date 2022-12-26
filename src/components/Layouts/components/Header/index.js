import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1>Header</h1>
            </div>
        </header>
    );
}

export default Header;
