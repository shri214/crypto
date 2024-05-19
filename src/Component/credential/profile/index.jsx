import { useEffect, useState } from 'react';
import Input from '../Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./style.css"

const Profile = () => {
  let user = JSON.parse(localStorage.getItem('users'));
  let loginDetail = JSON.parse(localStorage.getItem('loginUser'));

  let [UserName, setUserName] = useState(loginDetail ? loginDetail.name : '');
  let [currPass, setCurrPass] = useState('');
  let [NewPass, setNewPass] = useState('');

  let navigation = useNavigate();

  useEffect(() => {
    console.log('from profile');
    if (
      !localStorage.getItem('loginUser') &&
      window.location.pathname === '/profile'
    ) {
      navigation('/login');
    }
  }, []);

  const handelUpdateName = () => {
    for (let i = 0; i < user.length; i++) {
      if (user[i].email === loginDetail.email) {
        user[i].name = UserName;
        loginDetail.name = UserName;
        console.log(user, loginDetail);
      }
    }
    localStorage.setItem('users', JSON.stringify(user));
    localStorage.setItem('loginUser', JSON.stringify(loginDetail));
    return toast.success('Your profile saved');
  };

  const gettingName = (e) => {
    setUserName(e.target.value);
  };

  //pass managing

  const gettingCurrPass = (e) => {
    setCurrPass(e.target.value);
  };

  const gettingNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const changePass = () => {
    if (currPass !== loginDetail.pass) {
      return toast.error('Password not Matched');
    } else {
      for (let i = 0; i < user.length; i++) {
        if (user[i].email === loginDetail.email) {
          user[i].password = NewPass;
          loginDetail.pass = NewPass;
          console.log(user, loginDetail);
        }
      }
      localStorage.setItem('users', JSON.stringify(user));
      localStorage.setItem('loginUser', JSON.stringify(loginDetail));
    }
    setCurrPass('');
    setNewPass('');
    return toast.success('Password change successfully');
  };

  //logout

  const logoutClick = () => {
    console.log('logout is clicked');
    localStorage.removeItem('loginUser');
    setTimeout(() => {
      navigation('/login');
    }, 2000);
    return toast.success('you successfully logout');
  };

  let style = {
    display: 'block',
    margin: ' auto',
  };
  return (
    <div className='logout'>
      <div className="profile">
        <motion.h1
          className="login-slide"
          initial={{ opacity: 0, translateX: -100 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Profile
        </motion.h1>
        <ToastContainer />
        {user &&
          loginDetail &&
          user.map((ele) => {
            if (ele.email === loginDetail.email) {
              return (
                <motion.div
                  className="registration-containers"
                  initial={{ opacity: 0, translateX: -100 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="box-containers">
                    <Input
                      id={'name'}
                      type={'text'}
                      onchange={(e) => gettingName(e)}
                      place={'Email'}
                      value={UserName}
                    />
                  </div>
                  <motion.button
                    className="Reg-btn"
                    onClick={handelUpdateName}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    Save data
                  </motion.button>
                </motion.div>
              );
            }
          })}
      </div>

     <div className="change">
     <motion.div
        className="registration-cont"
        initial={{ opacity: 0, translateX: 100 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="box-cont">
          <Input
            id={'pass'}
            type={'password'}
            onchange={(e) => gettingCurrPass(e)}
            place={'Old Password'}
            value={currPass}
          />
          <Input
            id={'cnf'}
            type={'password'}
            onchange={(e) => gettingNewPass(e)}
            place={'New Password'}
            value={NewPass}
          />
        </div>
        <motion.button
          className="Reg-btn bb"
          onClick={changePass}
          initial={{ opacity: 0, translateX: 100 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Change Password
        </motion.button>
      </motion.div>
     </div>

      <div className="logout">
        <motion.button
          style={style}
          className="Reg-btn logout-btn "
          onClick={logoutClick}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1.5 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Logout
        </motion.button>
      </div>
    </div>
  );
};

export default Profile;