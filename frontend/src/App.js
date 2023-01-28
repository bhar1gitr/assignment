import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './component/Auth';
import OTP from './component/Auth/OTP';
import ForgetPassword from './component/Auth/ForgetPassword';
import ResetPassword from './component/Auth/ResetPassword';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<div>LoggedIN  Hello World</div>} />
          <Route exact path='/auth' element={<Auth />} />
          <Route path='/forget' element={<ForgetPassword />} />
          <Route path='/reset' element={<ResetPassword />} />
          <Route path='/otp' element={<OTP />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
