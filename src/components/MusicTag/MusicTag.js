import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

import styles from './MusicTag.module.scss';

function MusicTag({ label }) {
    if (label.trim()) {
        return (
            <p>
                <FontAwesomeIcon className={styles.icon} icon={faMusic} />
                <span className={styles.label}>{label}</span>
            </p>
        );
    }
}

MusicTag.propTypes = {
    label: PropTypes.string.isRequired,
};

export default MusicTag;
