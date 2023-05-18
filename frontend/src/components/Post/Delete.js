import * as postService from '../../services/postService';

import { useNavigate, useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

import useAuth from '../../hooks/useAuth';

import { SecureRoutes } from '../../hoc/SecureRoutes';

const Delete = () => {

    const navigate = useNavigate();

    const { auth } = useAuth();

    const postId = useParams('id').id;

    const [post, setPost] = useState({});

    useEffect(() => {
        postService.getOne(postId)
            .then(res => setPost(res.post))
            .catch(err => console.log(err));
    }, [postId]);

    const deletePost = async (e) => {
        e.preventDefault();

        try {
            if (auth.token && auth._id == post.owner) {
                await postService.delete(postId, auth.token); 
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section id="create-page" className="register">
            <form id="create-form" method='POST' onSubmit={deletePost}>
                <fieldset>
                    <legend>Confirm Delete</legend>
                    <input
                        className="button submit"
                        type="submit"
                        defaultValue="Register"
                    />
                </fieldset>
            </form>
        </section>
    );
};

export default SecureRoutes(Delete);