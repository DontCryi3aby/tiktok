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

    const { currentUser } = useContext(Context);

    useEffect(() => {
        (async () => {
            const token = !isEmptyObj(currentUser) ? currentUser.meta.token : '';
            const data = await userService.getAnUser({ nicknameParam, token });
            console.log(data);
            setUser(data);
        })();
    }, [currentUser, nicknameParam]);

    return (
        <div className={cx('wrapper')}>
            <User data={user} />
            <Videos data={user} />
        </div>
    );
}

export default Profile;
