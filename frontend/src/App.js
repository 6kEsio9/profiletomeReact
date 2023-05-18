import './App.css';

import { Header } from './components/common/Header';
import { Home } from './components/Home/Home';
import { Profile } from './components/Profile/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Footer } from './components/common/Footer';
import Create from './components/Post/Create';
import Delete from './components/Post/Delete';
import Edit from './components/Post/Edit';
import Chat from './components/Chat/Chat';

import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import { PostProvider } from './contexts/PostContext';

function App() {

  return (
    <>
      <AuthProvider>
        <PostProvider>
        <div id='box'>
          <Header />
          <main id='main-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/users/:id' element={<Profile />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/posts/create' element={<Create />} />
              <Route path='/posts/edit/:id' element={<Edit />} />
              <Route path='/posts/delete/:id' element={<Delete />} />
              <Route path='/chatroom' element={<Chat />} />
            </Routes>
          </main>
        </div>
        <Footer />
        </PostProvider>
      </AuthProvider>
    </>
  );
}

export default App;
