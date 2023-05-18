import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as authService from '../../services/authService';

import usePosts from '../../hooks/usePosts';
import useAuth from '../../hooks/useAuth';

import { Post } from './Post';
import { Picture } from './Picture';
import { Friend } from './Friend';

export const Profile = () => {

    const { auth } = useAuth();
    const [ posts, setPosts ] = usePosts();

    const profileId = useParams('id').id;

    const [profile, setProfile] = useState({});

    useEffect(() => {
        authService.getOne(profileId)
            .then(res => setProfile(res.user))
            .catch(err => console.log(err));
    }, [profileId])
    
    const filteredPosts = posts.filter(x => x.owner == profile._id);

    const onSubmit = (e) => {
        e.preventDefault();

        if (auth._id !== profile._id) {
            authService.addFriends(auth._id, profile._id)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        };

        auth.friends.push(profile._id);
        profile.friends.push(auth._id);
    };

    const getPost = (result) => {
        setPosts(state => {
            const likedState = state.map((x, i) => {
                if (x._id == result._id) {
                    state[i] = result;
                    return state[i];
                }
                return x;
            })
            return likedState;
        });
    };

    console.log(profile);

    return (
        <div className="profile-container">
            {profile.profileCoverImg ? <img src={profile.profileCoverImg} className="cover-img" /> : ''}
            <div className="profile-details">
                <div className="pd-left">
                    <div className="pd-row">
                        {profile.profileImg ? <img src={profile.profileImg} className="pd-image" /> : ''}
                        <div>
                            {profile.fullName ? <h3>{profile.fullName}</h3> : ''}
                            <p>{profile.friends ? profile.friends.length : ''} Friends</p>
                        </div>
                    </div>
                </div>
                <div className="pd-right">
                    <button type="button">
                        {auth && profile._id && auth._id != profile._id && !profile.friends.includes(auth._id) ? <img src="/images/add-friends.png" onClick={onSubmit} /> : ''}
                        {auth && profile._id && auth._id != profile._id && !profile.friends.includes(auth._id) ? "Friends" : ''}
                    </button>
                </div>
            </div>
            <div className="profile-info">
                <div className="info-col">
                    <div className="profile-intro">
                        <div className="title-box">
                            <h3>Photos</h3>
                            <a href="">All Photos</a>
                        </div>
                        <div className="photo-box">
                            {filteredPosts ? filteredPosts.map(x => <Picture key={x._id} image={x.imageUrl} />) : ''}
                        </div>
                    </div>
                    <div className="profile-intro">
                        <div className="title-box">
                            <h3>Friends</h3>
                            <a href="">All Friends</a>
                        </div>
                        <p>{profile._id ? profile.friends.length : ''}</p>
                        <div className="friends-box">
                            {profile._id ? profile.friends.map(x => <Friend key={x} friend={x} user={auth} />) : ''}
                        </div>
                    </div>
                </div>
                <div className="post-col">
                    {filteredPosts ? filteredPosts.map(x => <Post key={x._id} post={x} setPosts={getPost} />) : ''}
                </div>
            </div>
        </div>
    );
};