import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import styles from './Video.module.scss';
import Button from '~/components/Button';
import { MuteIcon, VolumeIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/AccountPreview';
import * as videoService from '~/services/videoService';
import { isEmptyObj } from '~/store/GlobalFunction';
import { Context } from '~/store/GlobalContext';

const cx = classNames.bind(styles);

const CommentSpace = ({ data: video }) => {
    // const renderPreview = (attrs) => (
    //     <div className={cx('preview')} tabIndex="-1" {...attrs}>
    //         <PopperWrapper>
    //             <AccountPreview data={data.user} />
    //         </PopperWrapper>
    //     </div>
    // );

    return (
        <div className={cx('container')}>
            {/* <div className={cx('user')}>
                <header className={cx('header')}>
                    <div className={cx('info')}>
                        <div className={cx('avt')}>
                            <Tippy
                                interactive
                                delay={[800, 0]}
                                placement="bottom-start"
                                offset={[-5, 0]}
                                render={renderPreview}
                            >
                                <Image className={cx('avatar')} src={data.user.avatar} />
                            </Tippy>
                        </div>
                        <div className={cx('desc')}>
                            <div>
                                <Tippy
                                    interactive
                                    delay={[800, 0]}
                                    placement="bottom"
                                    offset={[-5, 30]}
                                    render={renderPreview}
                                >
                                    <div className={cx('user')}>
                                        <h4 className={cx('username')}>{data.user.nickname}</h4>
                                        <span
                                            className={cx('name')}
                                        >{`${data.user.first_name} ${data.user.last_name}`}</span>
                                    </div>
                                </Tippy>
                            </div>
                            <p className={cx('caption')}>{data.description}</p>
                        </div>
                    </div>
                    {type === 'suggested' && (
                        <Button
                            className={cx('follow-btn')}
                            outline={!isFollowed}
                            small
                            onClick={() => {
                                isEmptyObj(currentUser) ? ShowModal(modalRef) : handleFollow();
                            }}
                        >
                            {isFollowed ? 'Following' : 'Follow'}
                        </Button>
                    )}
                </header>
                <div className={cx('music-tag')}>
                    <MusicTag className={cx('tag')} label={data.music} />
                </div>
            </div>
            <div className={cx('comments-list')}></div> */}
        </div>
    );
};

export default CommentSpace;

CommentSpace.propTypes = {
    data: PropTypes.object.isRequired,
};
