import PropTypes from 'prop-types';
import classNames from 'classnames';
import { forwardRef, useState } from 'react';

import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(
    ({ className, src, alt, width, height, fallback: customFallback = images.errorImage, ...props }, ref) => {
        const [fallback, setFallback] = useState('');
        const handleError = () => {
            setFallback(customFallback);
        };
        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallback || src}
                alt={alt}
                width={width}
                height={height}
                {...props}
                onError={handleError}
            />
        );
    },
);

Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default Image;
