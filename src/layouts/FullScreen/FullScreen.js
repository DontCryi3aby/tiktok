import Header from '~/layouts/components/Header';
import styles from './FullScreen.module.scss';
import PropTypes from 'prop-types';
import Sidebar from '~/layouts/components/Sidebar';

function FullScreen({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header isFullScreen />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}

export default FullScreen;

FullScreen.propTypes = {
    children: PropTypes.node.isRequired,
};
