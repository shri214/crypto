import Input from '../Input';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import "../sign/style.css"
const Login = () => {
  let [email, setEmail] = useState('');
  let [pass, setPass] = useState('');

  let navigator = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem('users') &&
      window.location.pathname === '/login'
    ) {
      navigator('/sign');
    } else if (
      localStorage.getItem('loginUser') &&
      window.location.pathname === '/login'
    ) {
      navigator('/dashboard');
    } else {
      navigator('/login');
    }
  }, []);

  const gettingEmail = (e) => {
    setEmail(e.target.value);
  };

  const gettingPass = (e) => {
    setPass(e.target.value);
  };

  const handelSubmission = () => {
    let user = JSON.parse(localStorage.getItem('users'));

    let emailChecker = false;
    user.forEach((ele) => {
      if (ele.email === email) {
        console.log(ele.email, 'and', email);
        emailChecker = true;
        if (pass === ele.password) {
          let name = ele.name;
          const accessToken = uuidv4();
          let obj = { email, pass, name, accessToken };

          localStorage.setItem('loginUser', JSON.stringify(obj));
          setTimeout(() => {
            navigator('/dashboard');
            console.log('login successful');
          }, 2000);
          return toast.success('you logged in Successfully');
        } else {
          return toast.error('incorrect password');
        }
      }
    });

    if (emailChecker === false) {
      return toast.error('Email not matched');
    }
  };
  return (
   
      <div className="registration-container">
        <ToastContainer />
        <motion.h1
          className="sign"
          initial={{ opacity: 0, translateX: -100 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Login
        </motion.h1>
        <div className="box-container">
          <Input
            id={'email'}
            type={'email'}
            onchange={(e) => gettingEmail(e)}
            place={'Email'}
            value={email}
          />
          <Input
            id={'pass'}
            type={'password'}
            onchange={(e) => gettingPass(e)}
            place={'Password'}
            value={pass}
          />
        </div>
        <button className="Reg-btn" onClick={handelSubmission}>
          Login
        </button>
      </div>
  );
};

export default Login;