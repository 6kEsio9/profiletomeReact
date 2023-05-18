import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

export const SettingsMenu = (props) => {
    
    let { onLogout } = useAuth();

    console.log(props.user);

    return (
        <div className="settings-menu">
            <div className="settings-menu-inner">
                <div className="user-profile">
                {props.user ? <img src={props.user.profileImg} /> : <img src='/images/no-pfp.png' />}
                    <div>
                        {props.user ? 
                        <Link to={`/users/${props.user._id}`}>Profile</Link> 
                        : 
                        <Link to="/login">Login</Link>}
                    </div>
                </div>
                <hr />
                <div className="user-profile">
                    <img src="/images/logout.png" />
                    <div>
                        {props.user ? <button onClick={onLogout}>Logout</button> : <Link to="/register">Register</Link>}
                    </div>
                </div>
            </div>
        </div>
    );
};