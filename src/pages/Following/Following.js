import { useEffect, useState, useContext } from 'react';
import { Context as userLoginContext } from '~/store/UserLoginContext';
import * as userService from '~/services/userService';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import DefaultPage from './DefaultPage';

const cx = classNames.bind(styles);

function Following() {
    // Get data from UserLoginContext
    // const { currentUser } = useContext(userLoginContext);

    // const [followingList, setFollowingList] = useState([]);

    // useEffect(() => {
    //     // IIFE
    //     (async () => {
    //         const data = await userService.getFollowing({ page: 1, type: 'following' });
    //         console.log(data);
    //     })();
    // }, []);

    // Fake login:
    const isLogin = false;

    return (
        <div className={cx('wrapper')}>
            {isLogin ? (
                <></>
            ) : (
                <div className={cx('container')}>
                    <DefaultPage />
                </div>
            )}
        </div>
    );
}

export default Following;
