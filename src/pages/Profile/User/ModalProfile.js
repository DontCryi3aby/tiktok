import classNames from 'classnames/bind';
import { forwardRef, useContext, useRef, useState } from 'react';

import styles from './User.module.scss';
import { CloseIcon, EditProfileIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Button from '~/components/Button';
import * as userService from '~/services/userService';
import { Context as globalContext } from '~/store/GlobalContext';

const cx = classNames.bind(styles);

const ModalProfile = ({ data: user, state }, ref) => {
    const { currentUser } = useContext(globalContext);

    const [usernameValue, setUsernameValue] = useState(user.nickname);
    const [nameValue, setNameValue] = useState(`${user.first_name} ${user.last_name}`);
    const [bioValue, setBioValue] = useState(user.bio);

    const saveBtnRef = useRef();
    const oldProfile = useRef({ username: usernameValue, name: nameValue, bio: bioValue });

    const [, setUserInfoProfile] = state;

    const checkAnyChange = () => {
        if (
            usernameValue !== oldProfile.current.username ||
            nameValue !== oldProfile.current.name ||
            bioValue !== oldProfile.current.bio
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleSave = () => {
        if (checkAnyChange()) {
            const payload = {
                username: usernameValue,
                name: nameValue,
                bio: bioValue,
                token: currentUser.meta.token,
            };
            (async () => {
                await userService.updateProfile(payload);
                oldProfile.current.username = usernameValue;
                oldProfile.current.name = nameValue;
                oldProfile.current.bio = bioValue;
                const user = { ...oldProfile.current };
                ref.current.classList.add(cx('hide'));
                setUserInfoProfile(user);
            })();
        }
    };

    return (
        <div className={cx('overlay', 'hide')} ref={ref}>
            <div className={cx('modal-wrapper')}>
                <header className={cx('modal-header')}>
                    <span className={cx('title')}>Edit profile</span>
                    <span className={cx('close-icon')} onClick={() => ref.current.classList.add(cx('hide'))}>
                        <CloseIcon />
                    </span>
                </header>

                <div className={cx('modal-content')}>
                    <div className={cx('profile-photo', 'profile-item')}>
                        <span className={cx('label')}>Profile photo</span>
                        <div className={cx('modal-image')}>
                            <Image
                                className={cx('profile-avt', 'edit-content')}
                                src={user.avatar}
                                alt={user.nickname}
                            />
                            <EditProfileIcon className={cx('edit-icon')} />
                        </div>
                    </div>

                    <div className={cx('profile-item')}>
                        <span className={cx('label')}>Username</span>
                        <div className={cx('edit-content')}>
                            <input
                                value={usernameValue}
                                className={cx('input')}
                                spellCheck={false}
                                placeholder="Username"
                                onChange={(e) => {
                                    saveBtnRef.current.classList.add(cx('active'));
                                    setUsernameValue(e.target.value);
                                }}
                            />
                            <span className={cx('profile-link', 'instruction')}>{`www.tiktok.com/@thach02hp`}</span>
                            <span className={cx('instruction')}>
                                Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                username will also change your profile link.
                            </span>
                        </div>
                    </div>

                    <div className={cx('profile-item')}>
                        <span className={cx('label')}>Name</span>
                        <div className={cx('edit-content')}>
                            <input
                                value={nameValue}
                                className={cx('input')}
                                spellCheck={false}
                                placeholder="Name"
                                onChange={(e) => {
                                    saveBtnRef.current.classList.add(cx('active'));
                                    setNameValue(e.target.value);
                                }}
                            />
                            <span className={cx('instruction')}>
                                Your nickname can only be changed once every 7 days.
                            </span>
                        </div>
                    </div>

                    <div className={cx('profile-item')}>
                        <span className={cx('label')}>Bio</span>
                        <div className={cx('edit-content')}>
                            <textarea
                                value={bioValue}
                                className={cx('input', 'bio-input', {
                                    overlength: bioValue.length > 80,
                                })}
                                spellCheck={false}
                                placeholder="Bio"
                                onChange={(e) => {
                                    saveBtnRef.current.classList.add(cx('active'));
                                    setBioValue(e.target.value);
                                }}
                            />
                            <span
                                className={cx('bio-length', 'instruction', { overlength: bioValue.length > 80 })}
                            >{`${bioValue.length}/80`}</span>
                        </div>
                    </div>
                </div>

                <footer className={cx('modal-footer')}>
                    <Button>Cancel</Button>
                    <Button
                        onClick={handleSave}
                        ref={saveBtnRef}
                        className={cx('save-btn', { active: checkAnyChange() })}
                    >
                        Save
                    </Button>
                </footer>
            </div>
        </div>
    );
};

export default forwardRef(ModalProfile);
