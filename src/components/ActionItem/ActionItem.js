import PropTypes from 'prop-types';

import classNames from 'classnames';
import styles from './ActionItem.module.scss';

function ActionItem({ className, icon }) {
    return <button className={classNames(styles.wrapper, [className])}>{icon}</button>;
}

ActionItem.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node.isRequired,
};

export default ActionItem;
