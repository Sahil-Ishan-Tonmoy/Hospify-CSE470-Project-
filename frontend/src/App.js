import {BrowserRouter, Routes, Route} from 'react-router-dom'


//pages and components
import Home from './pages/Home.page'
import Signup from './pages/Signup.page'
import Navbar from './components/Navbar.component'
import Profile from './pages/Profile.page'
import Login from './pages/Login.Page'
import ForgotPassword from './pages/ForgotPass.page'
import OtpVerification from './pages/OTPverification.page'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/home"
              element={<Home/>}
            />
            <Route
              path="/signup"
              element={<Signup/>}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword/>}
            />
            <Route
              path="/otpverify"
              element={<OtpVerification/>}
            />
            <Route
              path="/profile/:role/:id"
              element={<Profile/>}
            />
             <Route
              path="/login"
              element={<Login/>}
            />
            <Route
              path="/"
              element={<Login/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
