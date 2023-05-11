import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Upload.module.scss';
import Button from '~/components/Button';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function Upload() {
    const inputRef = useRef();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')} onClick={() => inputRef.current.click()}>
                    <FontAwesomeIcon className={cx('icon')} icon={faCloudArrowUp} />
                    <h3 className={cx('title')}>Select video to upload</h3>
                    <p className={cx('instruction')}>Drag and drop files</p>
                    <p className={cx('instruction')}>
                        Long videos can be split into multiple parts to get more exposure
                    </p>
                    <div className={cx('desc')}>
                        <p className={cx('size')}>Support mp4, avi, webm, and mov video formats</p>
                        <p className={cx('size')}>Up to 10 minutes</p>
                        <p className={cx('size')}>Less than 2 GB</p>
                        <p className={cx('size')}>Less than 30 videos</p>
                        <p className={cx('size', 'bold')}>Support uploading multiple videos</p>
                    </div>

                    <Button className={cx('btn')} primary>
                        Select files
                    </Button>

                    <input className={cx('input')} type="file" ref={inputRef} />
                </div>
            </div>
        </div>
    );
}

export default Upload;
