import { useEffect } from 'react';
import { useAuthHeader, useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../api';
const Login = () => {
  const { handleSubmit, register } = useForm<LoginInput>();
  const signIn = useSignIn();
  const auth = useAuthHeader();
  const isAuth = useIsAuthenticated();

  const navigate = useNavigate();
  const onSubmit = handleSubmit(async values => {
    const response = await api.post('/auth/login', values);

    signIn({
      token: response.data!.token,
      expiresIn: 10000,
      tokenType: 'Bearer',
      authState: {
        id: response.data!.user.id,
        email: response.data!.user.email
      }
    });

    if (response.data) {
      localStorage.setItem('token', response.data!.token);
      navigate('/', { replace: true });
    }
  });

  useEffect(() => {
    if (isAuth()) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  return (
    <div className='app__login'>
      <h3>Login</h3>
      <form onSubmit={onSubmit} className='form'>
        <div className='form__input'>
          <label htmlFor='email'>Username Or Email</label>
          <input
            {...register('usernameOrEmail')}
            name='usernameOrEmail'
            placeholder='Username Or Email'
          />
        </div>
        <div className='form__input'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password')}
            id='password'
            type='password'
            name='password'
            placeholder='Password'
          />
        </div>
        <button className='form__btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
