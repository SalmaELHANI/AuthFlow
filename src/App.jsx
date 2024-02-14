import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Login from './components/Login';
import PageUser from './components/Page_user';
import PageAdmin from './components/Page_admin';
import VerifyEmail from './components/VerifyEmail';
import Signup from './components/Signup';
import { Provider } from 'react-redux';
import store from './redux/Store';

function App() {
 
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/Sign_up' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/user_page' element={<PageUser/>}></Route>
      <Route path="/verify-email/:token"  element={<VerifyEmail/>}></Route>
      <Route path="/admin_page"  element={<PageAdmin/>}></Route>
    </Routes>
  </BrowserRouter>
  </Provider>
  )
}

export default App
