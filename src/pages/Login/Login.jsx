import React from 'react';
import styles from '../../assets/css/login.module.css';
// import nirLogoLighMood from '../../assets/img/nir_light.svg';
import nirLogoDarkMood from '../../assets/img/quick-t-icon.svg';
import { useTheme } from '@mui/material/styles';
import LoginForm from '../../components/LoginForm/LoginForm';

const Login = () => {
  const theme = useTheme();
  // console.log(theme.palette?.mode)
  return (
    <div className={styles.parent}>
      <img src={nirLogoDarkMood} alt="logo" />
      <h2 style={{ marginTop: '20px' }}>Welcome Admin</h2>

      <LoginForm />
    </div>
  );
};

export default Login;