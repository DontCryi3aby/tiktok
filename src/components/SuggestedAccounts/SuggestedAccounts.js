import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import AccountItem from './AccountItem';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />

            <button className={cx('more-btn')}>See all</button>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
