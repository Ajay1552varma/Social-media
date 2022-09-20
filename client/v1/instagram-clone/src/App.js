
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ChatProvider } from './Context/ChatContext';
import { PostProvider } from './Context/PostContext';
import { UserProvider } from './Context/UserContext';
import AddPostPage from './pages/AddPostPage';
import BaseLayout from './pages/BaseLayout';
import ChatPage from './pages/ChatBasePage';
import EditPage from './pages/EditPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import FindFriendsPage from './pages/FindFriendsPage';
import HomePage from './pages/HomePage';
import IndividualChatPage from './pages/IndividualChatPage';
import LoginPage from './pages/LoginPage';
import ProtectedPage from './pages/ProtectedPage';
import SignUpPage from './pages/SignUpPage';
import SinglePostPage from './pages/SinglePostPage';
import UserPage from './pages/UserPage';
function App() {
  return (
    <>
    <UserProvider>
      <PostProvider>
      <ChatProvider>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedPage>
              <BaseLayout/>
            </ProtectedPage>
          }>
            <Route index element={<HomePage/>}/>
            <Route  path='post' element={<AddPostPage/>}/>
            <Route path='friends' element={<FindFriendsPage/>}/>
            <Route path='user' element={<UserPage/>}/>
            <Route path='post/:postId' element={<SinglePostPage/>}/>
            <Route path='/user/edit' element={<EditPage/>}/>
            <Route path='chat' element={
            <>
            <ChatPage/>
            </>
            }>
              <Route path=':uId' element={<IndividualChatPage/>}/>
            </Route>
          </Route>
            <Route path='/auth/login' element={<LoginPage/>}/>
            <Route path='/auth/verifyaccount' element={<EmailVerificationPage/>}/>
            <Route path='/auth/signup' element={<SignUpPage/>}/>

            {/* Test */}
          {/* <Route path='/auth' element = {
            <>
                <h1>Auth page</h1>
                <Outlet/>
            </>
                }>
            <Route path='login' element={<h1>Login</h1>}/>
            <Route path='signup' element={<SignUp/>}/>
          </Route> */}
          <Route path='*' element={
            <h1>404! not found</h1>
          }/>
        </Routes>
      </BrowserRouter>
      
      </ChatProvider>
      </PostProvider>


    </UserProvider>

    </>
  );
}

export default App;
