import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            to,
            href,
            primary = false,
            outline = false,
            rounded = false,
            disabled = false,
            small = false,
            large = false,
            children,
            className,
            leftIcon,
            rightIcon,
            onClick,
            ...passProps
        },
        ref,
    ) => {
        let Component = 'button';
        const props = {
            onClick,
            ...passProps,
        };

        // Remove event listener when btn is disabled
        if (disabled) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith('on') && typeof props[key] === 'function') {
                    delete props[key];
                }
            });
        }

        if (to) {
            Component = Link;
            props.to = to;
        } else if (props.href) {
            Component = 'a';
            props.href = href;
        }

        const classes = cx('wrapper', {
            primary,
            outline,
            rounded,
            disabled,
            small,
            large,
            [className]: className,
        });

        return (
            <Component ref={ref} {...props} className={classes}>
                {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                <span className={cx('title')}>{children}</span>
                {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            </Component>
        );
    },
);

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;
