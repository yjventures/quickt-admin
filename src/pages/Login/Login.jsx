import React from 'react';
import styles from '../../assets/css/login.module.css';
// import nirLogoLighMood from '../../assets/img/nir_light.svg';
import logo from '../../assets/img/qt-logo.png';
import { useTheme } from '@mui/material/styles';
import LoginForm from '../../components/LoginForm/LoginForm';

const Login = () => {
  const theme = useTheme();
  // console.log(theme.palette?.mode)
  return (
    <div className={styles.parent}>
      <img src={logo} alt="logo"
        style={{
          width: '200px',
          height: '100px',
          objectFit: 'cover'
        }}
      />
      <h2>Welcome Admin</h2>

      <LoginForm />
    </div>
  );
};

export default Login;