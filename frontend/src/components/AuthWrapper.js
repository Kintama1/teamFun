import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthWrapper = ({onLoginSuccess}) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <>
      {isLogin ? (
        <Login 
        onSwitchToRegister={switchToRegister} 
        onLoginSuccess={onLoginSuccess}
        />
      ) : (
        <Register onSwitchToLogin={switchToLogin} 
        onLoginSuccess={onLoginSuccess}/>
      )}
    </>
  );
};

export default AuthWrapper;