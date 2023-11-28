import React, { useContext } from 'react';
import styles from '../../assets/css/login.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { CircularProgress } from '@mui/material';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login, loading } = useContext(AuthContext);
    const [error, setError] = React.useState(null);
    const handleLogin = async (e) => {
        setError(null);
        e.preventDefault();

        // check if password is at least 6 characters long
        if (e.target.password.value.length < 8) {
            // console.log('Regex detected short password')
            setError('Password must be at least 8 characters long');
            return;
        }

        if (e.target.email.value === '' || e.target.password.value === '') {
            setError('Please fill in the form');
            return;
        }

        try {
            const result = await login(e.target.email.value, e.target.password.value);
            console.log(result)
            if(result.isAdmin) {
                navigate('/dashboard/generalSettings');
            } else {
                alert('You are not an admin');
                
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleLogin} onChange={() => setError(null)}>
            <div className={styles.box}>
                <label htmlFor="email">Email</label>
                <input name='email' type="email" autoComplete="true" placeholder="Email" className={styles.input} />
            </div>
            <div className={styles.box}>
                <label htmlFor="email">Password</label>
                <input name='password' type="password" placeholder="Password" className={styles.input} />
            </div>

            <button className={styles.button} type='submit'>
                {
                    loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : 'Login'
                }
            </button>
            {
                error && <div className={styles.error}>{error}</div>
            }
        </form>
    );
};

export default LoginForm;
