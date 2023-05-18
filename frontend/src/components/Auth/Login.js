import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { login } from '../../services/authService';

import { isLogged } from '../../hoc/SecureRoutes';

const Login = () => {

  const navigate = useNavigate();

  const { onLogin } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.target));

    
    login({email, password})
      .then(res => {
          if(!res.token){
            return null;
          }
          onLogin(res);
          navigate('/');
      })
      .catch((err) => console.log(err));
  };

    return(
        <section id="login-page" className="login">
        <form id="login-form" action="/users/login" method="POST" onSubmit={onSubmit}>
          <fieldset>
            <legend>Login Form</legend>
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
            <input className="button submit" type="submit" defaultValue="Login" />
          </fieldset>
        </form>
      </section>
    );
};

export default isLogged(Login);