import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';

import * as postService from '../../services/postService';

export const Post = (props) => {

  const auth = JSON.parse(localStorage.getItem('auth'));

  const [postOwner, setPostOwner] = useState({});

  useEffect(() => {
    authService.getOne(props.post.owner)
      .then(res => setPostOwner(res))
      .catch(err => console.log(err));
  }, [authService, props.post]);

  const onLike = async () => {
    const result = await postService.like(auth._id, props.post._id, auth.token);

    props.getPost(result);
  };

  return (
    <div className="post-container">
      <div className="post-row">
        <div className="user-profile">
          <Link to={postOwner.user ? `/users/${postOwner.user._id}` : ''}><img src={postOwner.user ? postOwner.user.profileImg : ''} /></Link>
          <div>
            {postOwner.user ? <p>{postOwner.user.fullName}</p> : ''}
          </div>
        </div>
        {auth && postOwner.user && auth._id == postOwner.user._id ? <Link to={`/posts/edit/${props.post._id}`}>Edit</Link> : ''}
        {auth && postOwner.user && auth._id == postOwner.user._id ? <Link to={`/posts/delete/${props.post._id}`}>Delete</Link> : ''}
      </div>
      <p className="post-text">{props.post.caption}</p>
      <img src={props.post.imageUrl} className="post-img" />
      <div className="post-row">
        <div className="activity-icons">
          <div>
            {props.post && auth && props.post.likedUsers.includes(auth._id) ? <img src="/images/like-blue.png" /> : <img src="/images/like-blue.png" onClick={onLike} />} {props.post.likedUsers.length}
          </div>
        </div>
      </div>
    </div>
  );
};