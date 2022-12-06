import { useState } from 'react';
import { useAuthHeader, useAuthUser, useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Home = () => {
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[] | null>(null);

  const getUser = async () => {
    const res = (await api.get('/user')) as { data: User[] };

    setUsers(res.data);
  };

  const logout = async () => {
    const response = await api.post('/auth/logout');

    if (response.data) {
      localStorage.clear();
      signOut();
      navigate('/login');
    }
  };

  return (
    <div className='app__home'>
      <button onClick={getUser}>Get User</button>
      {users?.map(user => {
        return (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
          </div>
        );
      })}

      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
