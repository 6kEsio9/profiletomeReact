import { useState } from "react";
import { useEffect } from "react";

import * as postService from '../services/postService';

const usePosts = () => {

    const [state, setState] = useState([]);

    useEffect(() => {
        postService.getAll()
            .then((res) => setState(res.reverse()))
            .catch(err => console.log(err));
    }, []);

    const setPost = (data) => {
        setState(data);
    };

    return [ state, setPost ];

};

export default usePosts;