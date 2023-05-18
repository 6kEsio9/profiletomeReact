import * as postService from '../../services/postService';

import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { SecureRoutes } from '../../hoc/SecureRoutes';

const Create = () => {

    const navigate = useNavigate();

    const { auth } = useAuth();

    const createPost = async (e) => {
        e.preventDefault();

        const { imageUrl, caption } = Object.fromEntries(new FormData(e.target));

        console.log(imageUrl, caption);

        try{
          if(auth.token){
            const result = await postService.create({ imageUrl, caption }, auth.token);
            
            navigate('/');
          }
        }catch(error){
            console.log(error);
        }
    };

    

    return(
        <section id="create-page" className="register">
        <form id="create-form" action='/posts/create' method='POST' onSubmit={createPost}>
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

export default SecureRoutes(Create);