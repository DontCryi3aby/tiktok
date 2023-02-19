import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import AccountItem from './AccountItem';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, data = [], isShowPreview = false }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data.map((account) => (
                <AccountItem key={account.id} data={account} isShowPreview={isShowPreview} />
            ))}

            <button className={cx('more-btn')}>See all</button>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    isShowPreview: PropTypes.bool,
};

export default SuggestedAccounts;
