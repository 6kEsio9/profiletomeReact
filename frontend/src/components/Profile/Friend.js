import { Link } from 'react-router-dom';

import * as authService from '../../services/authService';

import { useState, useEffect } from 'react';

export const Friend = (props) => {

    const [friend, setFriend] = useState({});

    useEffect(() => {
        authService.getOne(props.friend)
            .then(res => setFriend(res.user))
            .catch(err => console.log(err));
    }, [friend]);

    return (
        <div>
            <Link to={friend ? `/users/${friend._id}` : ''}><img src={friend ? `${friend.profileImg}` : ''} /> <p>{friend ? `${friend.fullName}` : ''}</p></Link>
        </div>
    );
};