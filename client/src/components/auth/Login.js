import React, {useContext, useState, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {setAlert} = alertContext;
    const {login, isAuthenticated, clearErrors, error} = authContext;

    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated){
            navigate('/');
        }

        if(error === 'Invalid Credentials'){
            setAlert(error, 'danger');
            clearErrors();
        }
        
    }, [error, isAuthenticated, clearErrors, setAlert, navigate])

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const {email, password} = user;

    const onChange = e => setUser({...user, [e.target.name] : e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if( (email.trim().length === 0) || (password.trim().length === 0)){
            setAlert('Please enter all fields', 'danger');
        }
        else{
            login({
                email,
                password
            })
        }
        
    }
  return (
    <div className='form-container'>
        <h1>
            Account <span className='text-primary'>Login</span>
        </h1>
        <form onSubmit={onSubmit} className='form-style'>
            <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input type='email' name='email' value={email} onChange={onChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={password} onChange={onChange} />
            </div>
            <input type='submit' value='Login' className='btn btn-primary btn-block' />
        </form>
        
    </div>
  )
}

export default Login