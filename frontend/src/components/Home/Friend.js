import { Link } from 'react-router-dom';

import * as authService from '../../services/authService';

import { useState, useEffect } from 'react';

export const Friend = (props) => {

    const [friend, setFriend] = useState({});

    useEffect(() => {
        authService.getOne(props.friend)
            .then(res => setFriend(res.user))
            .catch(err => console.log(err));
    }, [authService, friend]);

    return (
        <div className="friends-list">
            <div>
              <Link to={`/users/${friend._id}`}><img src={friend ? friend.profileImg : ''} /></Link>
            </div>
            <p>{friend ? friend.fullName : ''}</p>
          </div>
    );
};