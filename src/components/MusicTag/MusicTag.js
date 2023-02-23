import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

import styles from './MusicTag.module.scss';

const cx = classNames.bind(styles);

function MusicTag({ label, className }) {
    if (label.trim()) {
        return (
            <p>
                <FontAwesomeIcon className={cx('icon', { [className]: className })} icon={faMusic} />
                <span className={cx('label', { [className]: className })}>{label}</span>
            </p>
        );
    }
}

MusicTag.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default MusicTag;
