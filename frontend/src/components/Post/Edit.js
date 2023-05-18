import * as postService from '../../services/postService';

import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import useAuth from '../../hooks/useAuth';

import { SecureRoutes } from '../../hoc/SecureRoutes';

const Edit = () => {

    const navigate = useNavigate();

    const { auth } = useAuth();

    const postId = useParams('id').id;

    const [post, setPost] = useState({});

    useEffect(() => {
        postService.getOne(postId)
            .then(res => {
                setPost(res.post);
            })
            .catch(err => console.log(err));
    }, [postId]);

    const editPost = async (e) => {
        e.preventDefault();

        const { imageUrl, caption } = Object.fromEntries(new FormData(e.target));

        console.log(imageUrl, caption);

        if (auth._id == post.owner) {
            try {
                await postService.edit({ imageUrl, caption }, postId, auth.token);
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <section id="create-page" className="register">
            <form id="create-form" method='POST' onSubmit={editPost}>
                <fieldset>
                    <legend>Post Form</legend>
                    <p className="field">
                        <label htmlFor="email">Post Picture</label>
                        <span className="input">
                            <input
                                type="text"
                                name="imageUrl"
                                id="image"
                                placeholder="https://"
                                defaultValue={post ? post.imageUrl : ''}
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="email">Caption</label>
                        <span className="input">
                            <input
                                type="text"
                                name="caption"
                                id="cap"
                                placeholder="Caption..."
                                defaultValue={post ? post.caption : ''}
                            />
                        </span>
                    </p>
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

export default SecureRoutes(Edit);