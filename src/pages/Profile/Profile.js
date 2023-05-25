import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Profile.module.scss';

import * as userService from '~/services/userService';
import { Context } from '~/store/GlobalContext';
import { isEmptyObj } from '~/store/GlobalFunction';
import User from './User';
import Videos from './Videos/Videos';

const cx = classNames.bind(styles);

function Profile() {
    const { nickname: nicknameParam } = useParams();
    const [user, setUser] = useState({});

    const { currentUser, token: bearerToken } = useContext(Context);

    useEffect(() => {
        (async () => {
            const token = !isEmptyObj(currentUser) ? bearerToken : '';
            const data = await userService.getAnUser({ nicknameParam, token });
            setUser(data);
        })();
    }, [currentUser, nicknameParam, bearerToken]);

    return (
        <div className={cx('wrapper')}>
            {!isEmptyObj(user) && (
                <>
                    <User data={user} />
                    <Videos data={user} />
                </>
            )}
        </div>
    );
}

export default Profile;
