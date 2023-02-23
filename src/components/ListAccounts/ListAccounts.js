import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import AccountItem from './AccountItem';
import styles from './ListAccounts.module.scss';

const cx = classNames.bind(styles);

function ListAccounts({ label, data = [], isShowPreview = false, onClickBtn = () => {}, titleBtn }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data.map((account) => (
                <AccountItem key={account.id} data={account} isShowPreview={isShowPreview} />
            ))}

            <button className={cx('more-btn')} onClick={onClickBtn}>
                {titleBtn}
            </button>
        </div>
    );
}

ListAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    isShowPreview: PropTypes.bool,
    onClickBtn: PropTypes.func,
    titleBtn: PropTypes.node.isRequired,
};

export default ListAccounts;
