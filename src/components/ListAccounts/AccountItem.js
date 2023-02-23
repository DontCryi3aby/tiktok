import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './ListAccounts.module.scss';
import Image from '~/components/Image';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data, isShowPreview = false }) {
    const renderPreview = (attrs) => (
        <div className={cx('preview')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <AccountPreview data={data} />
            </PopperWrapper>
        </div>
    );

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this problem by creating a new parentNode context.
        <div>
            <Tippy
                interactive
                delay={[800, 0]}
                placement="bottom"
                offset={[-24, 0]}
                render={isShowPreview ? renderPreview : () => {}}
            >
                <Link to={`/@${data.nickname}`} className={cx('account-item')}>
                    <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                    <div className={cx('info')}>
                        <h4 className={cx('username')}>
                            <span>{data.nickname}</span>
                            {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                        </h4>
                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                </Link>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    isShowPreview: PropTypes.bool,
};

export default AccountItem;
