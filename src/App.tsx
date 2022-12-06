import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';
import './app.scss';
import Home from './pages/Home';
import Login from './pages/Login';
const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route
          index
          element={
            <RequireAuth loginPath='/login'>
              <Home />
            </RequireAuth>
          }
        />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
