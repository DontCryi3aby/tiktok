import PropTypes from 'prop-types';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import MainModal from '~/components/Modals/MainModal';
import { useRef } from 'react';
import AuthContext from '~/store/AuthContext';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    // Provide Value To AuthContext
    const modalRef = useRef();
    const ShowModal = (ref) => {
        ref.current.classList.add('show');
        ref.current.classList.remove('hide');
    };

    const HideModal = (ref) => {
        ref.current.classList.remove('show');
        ref.current.classList.add('hide');
    };
    const valueAuthContext = {
        modalRef,
        ShowModal,
        HideModal,
    };

    return (
        <AuthContext value={valueAuthContext}>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <Sidebar />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
            <MainModal />
        </AuthContext>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
