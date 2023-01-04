import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    return (
        <Button to={data.to} leftIcon={data.icon} className={cx('menu-item')}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
