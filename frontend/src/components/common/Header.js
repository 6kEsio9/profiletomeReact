import { Link } from 'react-router-dom';

import { useState } from 'react';

import { SettingsMenu } from './SettingsMenu';

import useAuth from '../../hooks/useAuth';

export const Header = () => {

    const { auth } = useAuth();

    const [toggle, setToggle] = useState(false);


    const toggleSettings = () => {
        if (toggle) {
            return setToggle(false);
        }
        setToggle(true);
    };
    return (
        <nav>
            <div className="nav-left">
                <Link to="/"><img src="/images/logo.png" className="logo" /></Link>
            </div>
            <div className="nav-right">
                <div className="search-box">
                    <img src="/images/search.png" />
                    <input type="text" placeholder="Search" />
                </div>
                <div className="nav-user-icon" onClick={toggleSettings}>
                    {auth ? <img src={auth.profileImg} /> : <img src='/images/no-pfp.png' />}
                </div>
                {toggle ? <SettingsMenu user={auth} /> : ''}
            </div>
        </nav>
    );
};