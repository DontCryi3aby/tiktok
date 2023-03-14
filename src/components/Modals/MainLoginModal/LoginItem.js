import PropTypes from 'prop-types';

import styles from './MainLoginModal.module.scss';
import { defaultFn } from '~/store/GlobalFunction';

const LoginItem = ({ className, icon, label, onClick = defaultFn }) => {
    return (
        <div className={className} onClick={onClick}>
            <span className={styles.icon}>{icon}</span>
            <p className={styles.label}>{label}</p>
        </div>
    );
};

LoginItem.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default LoginItem;
