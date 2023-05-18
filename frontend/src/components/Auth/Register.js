import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { register } from '../../services/authService';

import { isLogged } from '../../hoc/SecureRoutes';

const Register = () => {

  const navigate = useNavigate();

  const { onLogin } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPass, profileImg, profileCoverImg } = Object.fromEntries(new FormData(e.target));

    if(password !== confirmPass){
      throw new Error('Passwords dont match.');
    }
    
    register({fullName, email, password, profileImg, profileCoverImg})
      .then(res =>{
        if(!res.token){
          return null;
        }
        onLogin(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

    return(
        <section id="register-page" className="register">
        <form id="register-form" action="/users/register" method="POST" onSubmit={onSubmit}>
          <fieldset>
            <legend>Register Form</legend>
            <p className="field">
              <label htmlFor="email">Full Name</label>
              <span className="input">
                <input
                  type="text"
                  name="fullName"
                  id="fn"
                  placeholder="Michael Jordan"
                />
              </span>
            </p>
            <p className="field">
              <label htmlFor="email">Email</label>
              <span className="input">
                <input type="text" name="email" id="email" placeholder="Email" />
              </span>
            </p>
            <p className="field">
              <label htmlFor="password">Password</label>
              <span className="input">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </span>
            </p>
            <p className="field">
              <label htmlFor="repeat-pass">Repeat Password</label>
              <span className="input">
                <input
                  type="password"
                  name="confirmPass"
                  id="repeat-pass"
                  placeholder="Repeat Password"
                />
              </span>
            </p>
            <p className="field">
              <label htmlFor="repeat-pass">Profile Picture</label>
              <span className="input">
                <input
                  type="text"
                  name="profileImg"
                  id="pfp"
                  placeholder="http://"
                />
              </span>
            </p>
            <p className="field">
              <label htmlFor="email">Profile Cover Picture</label>
              <span className="input">
                <input
                  type="text"
                  name="profileCoverImg"
                  id="pf-cover"
                  placeholder="http://"
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

export default isLogged(Register);