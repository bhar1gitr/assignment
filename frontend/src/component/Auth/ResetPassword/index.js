import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Api} from '../../../urlConfig';
import './index.css';

const ResetPassword = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetSubmit = async () => {
    if(password!==confirmPassword) return;
    const email = localStorage.getItem('email');
    const user = {email,password};
    const res = await axios.post(`${Api}/reset-password`, user);
    console.log(res);
    navigate('/');
  }
  return (
    <div className="container-resetPass">
      <div className="resetPass-auth form-resetPass">
        <header>Reset Password</header>
        <form action="#">
          <input type="password" placeholder="Create a password" onChange={(e)=>setPassword(e.target.value)} value={password} />
          <input type="password" placeholder="Confirm your password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} />
          <input type="button" onClick={handleResetSubmit} className="button-resetPass" value="Reset" />
        </form>
      </div>
    </div>
  )
}

export default ResetPassword;