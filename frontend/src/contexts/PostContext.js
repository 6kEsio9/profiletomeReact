import { createContext, useState, useEffect } from "react";

import * as postService from '../services/postService';

const PostContext = createContext();

export const PostProvider = ({
    children 
}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getAll()
            .then(res => setPosts(res.posts.reverse()))
            .catch(err => console.log(err));
    }, [])

    return(
        <PostContext.Provider value={ {posts, setPosts} } >
            {children}
        </PostContext.Provider>
    );
}

export default PostContext;