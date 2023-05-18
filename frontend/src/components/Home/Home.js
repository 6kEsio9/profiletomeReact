import { Post } from './Post';

import { Link } from 'react-router-dom';

import usePosts from '../../hooks/usePosts';

import { Friend } from './Friend';

import useAuth from '../../hooks/useAuth';

export const Home = () => {
  
  const { auth } = useAuth();
  
  const [ posts, setPosts ] = usePosts();

  console.log(posts);

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

  return (
    <div className="container">
      <div className="left-sidebar">
        <div className="imp-links">
          <a href="#">
            <img src="images/friends.png" /> Friends
          </a>
          <Link to='/chatroom'><img src='images/comments.png' /> Chat</Link>
        </div>
      </div>
      <div className="main-content">
        <div className="write-post-container">
          <div className="user-profile">
            {auth ? <img src={auth.profileImg} /> : <img src='images/no-pfp.png' />}
            <div>
              {auth
                ?
                <p>{auth.fullName}</p>
                :
                <p>Login to make a post</p>
              }
            </div>
          </div>
          <div className="post-input-container">
            <div className="add-post-links">
              <Link to="/posts/create">
                <img src="images/photo.png" /> Photo
              </Link>
            </div>
          </div>
        </div>
        {posts ? posts.map(x => <Post key={x._id} post={x} getPost={getPost} />) : ''}
      </div>
      <div className="right-sidebar">
        <div className="sidebar-title">
          <h4>Friend List</h4>
        </div>
        {auth ? auth.friends.map(x => <Friend key={x} friend={x} />) : ''}
      </div>
    </div>
  );
};