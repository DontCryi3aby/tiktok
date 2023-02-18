import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './SuggestedAccounts.module.scss';
import Image from '~/components/Image';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/AccountPreview';

const cx = classNames.bind(styles);

function AccountItem() {
    const renderPreview = (attrs) => (
        <div className={cx('preview')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <AccountPreview />
            </PopperWrapper>
        </div>
    );

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this problem by creating a new parentNode context.
        <div>
            <Tippy interactive delay={[800, 0]} placement="bottom" offset={[-24, 0]} render={renderPreview}>
                <Link to={`/@thach`} className={cx('account-item')}>
                    <Image
                        className={cx('avatar')}
                        src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/45819ddf6526367017c64f74853a6c53~c5_100x100.jpeg?x-expires=1676890800&x-signature=y%2BSxNTjRS1UgTRDpKY4x0XqJsZY%3D"
                        alt=""
                    />
                    <div className={cx('info')}>
                        <h4 className={cx('username')}>
                            <span>nguyenngocthach</span>
                            <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                        </h4>
                        <p className={cx('name')}>Nguyễn Ngọc Thạch</p>
                    </div>
                </Link>
            </Tippy>
        </div>
    );
}
export default AccountItem;
