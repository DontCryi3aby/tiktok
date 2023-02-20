import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

import styles from './Hashtag.module.scss';

function Hashtag({ label }) {
    if (label.trim()) {
        return (
            <p>
                <FontAwesomeIcon className={styles.icon} icon={faHashtag} />
                <span className={styles.label}>{label}</span>
            </p>
        );
    }
}

Hashtag.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Hashtag;
