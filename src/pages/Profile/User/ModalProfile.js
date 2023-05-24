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

    const [avatarReview, setAvatarReview] = useState(user.avatar);
    const [avatarFile, setAvatarFile] = useState();
    const [usernameValue, setUsernameValue] = useState(user.nickname);
    const [nameValue, setNameValue] = useState(`${user.first_name} ${user.last_name}`);
    const [bioValue, setBioValue] = useState(user.bio);

    const saveBtnRef = useRef();
    const inputFileRef = useRef();
    const oldProfile = useRef({ avatar: avatarReview, username: usernameValue, name: nameValue, bio: bioValue });

    const [, setUserInfoProfile] = state;
    const prevAvatar = useRef(user.avatar);

    const checkAnyChange = () => {
        if (
            avatarReview !== oldProfile.current.avatar ||
            usernameValue !== oldProfile.current.username ||
            nameValue !== oldProfile.current.name ||
            bioValue !== oldProfile.current.bio
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleChangeAvatar = () => {
        inputFileRef.current.click();
    };

    const handleUploadAvatar = (e) => {
        if (e.target.files && e.target.files[0]) {
            const avt = e.target.files[0];
            console.log(avt);
            setAvatarFile(avt);
            setAvatarReview(URL.createObjectURL(avt));
        }
    };

    const handleSave = () => {
        // if (checkAnyChange()) {
        const firstName = nameValue
            .split(' ')
            .slice(0, nameValue.split(' ').length - 1)
            .join(' ');
        const lastName = nameValue.split(' ').pop();

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${currentUser.meta.token}`);

        const formData = new FormData();
        formData.append('avatar', avatarFile);
        formData.append('username', usernameValue);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('bio', bioValue);

        const requestOptions = {
            method: 'PATCH',
            headers: headers,
            body: formData,
        };

        const fetchAPI = async () => {
            const res = await userService.updatePF(requestOptions);
            console.log('res: ', res);
            // setUserInfoProfile(user)
        };
        fetchAPI();
        // }

        // (async () => {
        //     console.log(payload);
        //     await userService.updateProfile(payload);
        //     oldProfile.current.avatar = avatarReview;
        //     oldProfile.current.username = usernameValue;
        //     oldProfile.current.name = nameValue;
        //     oldProfile.current.bio = bioValue;
        //     const user = { ...oldProfile.current };
        //     ref.current.classList.add(cx('hide'));
        //     setUserInfoProfile(user);
        // })();
    };

    return (
        <div className={cx('overlay', 'hide')} ref={ref}>
            <div className={cx('modal-wrapper')}>
                <header className={cx('modal-header')}>
                    <span className={cx('title')}>Edit profile</span>
                    <span
                        className={cx('close-icon')}
                        onClick={() => {
                            ref.current.classList.add(cx('hide'));
                            setAvatarReview(prevAvatar.current);
                            saveBtnRef.current.classList.remove(cx('active'));
                        }}
                    >
                        <CloseIcon />
                    </span>
                </header>

                <div className={cx('modal-content')}>
                    <div className={cx('profile-photo', 'profile-item')}>
                        <span className={cx('label')}>Profile photo</span>
                        <div className={cx('modal-image')} onClick={handleChangeAvatar}>
                            <Image
                                className={cx('profile-avt', 'edit-content')}
                                src={avatarReview}
                                alt={user.nickname}
                            />
                            <EditProfileIcon className={cx('edit-icon')} />
                            <input
                                ref={inputFileRef}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleUploadAvatar}
                            />
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
                    <Button
                        onClick={() => {
                            ref.current.classList.add(cx('hide'));
                            setAvatarReview(prevAvatar.current);
                            saveBtnRef.current.classList.remove(cx('active'));
                        }}
                    >
                        Cancel
                    </Button>
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
