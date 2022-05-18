import React from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../assets/images/google.svg'
import auth from '../firebaseinit';

const Login = () => {
  const goHome = useNavigate();
  const [luser, lloading, lerror] = useAuthState(auth);
  if(luser) {
    goHome('/')
  }
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <div className='text-center'>
      <button onClick={()=>signInWithGoogle()} className={`google_signin mb-5 mt-5 ${loading ? 'btn loading' : ''}`}>
          <img width={20} src={googleIcon} alt="" /> &nbsp; Signin with Google
        </button>
    </div>
  );
};

export default Login;