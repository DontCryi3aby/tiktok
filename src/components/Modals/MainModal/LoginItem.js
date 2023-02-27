import PropTypes from 'prop-types';

import styles from './MainModal.module.scss';

const LoginItem = ({ className, icon, label }) => {
    return (
        <div className={className}>
            <span className={styles.icon}>{icon}</span>
            <p className={styles.label}>{label}</p>
        </div>
    );
};

LoginItem.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
};

export default LoginItem;
