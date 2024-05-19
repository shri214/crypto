import { toast } from 'react-toastify';

let ArrayUser = [];
let watchList = [];
export const validation = (name, email, password, cnf) => {
  let flag = true;

  //if any user are stored in local storage so same email cannot be used more than one time
  if (localStorage.getItem('users')) {
    let user = JSON.parse(localStorage.getItem('users'));
    //being array empty
    ArrayUser = [];
    watchList = [];
    user.forEach((ele) => {
      // all existing users
      ArrayUser.push(ele);

      //pushing all email in watch
      let emails = ele.email;
      let obj = [emails];
      watchList.push(obj);

      //if this particular email is stored earlier than it return and there will no change in user credential

      // if it is not existing than as we can see that all credential being pushed in array
      // and at the end pushed array as well as new users credential all store in local storage
      if (ele.email === email) {
        flag = false;
        return toast.error('Email is already used');
      }
    });
  }

  //regex expression for validation the email
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  //if any field is empty simply return
  if ((name === '', email === '' || password === '' || cnf === '')) {
    flag = false;
    return toast.error('All field are required');
  }

  //if email is not valid simply return
  if (!email.match(validRegex)) {
    flag = false;
    return toast.error('Invalid Email');
  }

  //if pass length is not 8
  if (password.length < 8) {
    flag = false;
    return toast.error('pass length must be 8 char');
  }

  let reg_a = /[a-z]/i;
  let regA = /[A-Z]/i;
  let reg1 = /[0-9]/i;

  //if pass not include
  if (
    !password.match(reg1) ||
    !password.match(reg_a) ||
    !password.match(regA)
  ) {
    console.log('pass is ', password);
    flag = false;
    return toast.error('pass must contain A a 0-9');
  }

  //checking pass and cnf pass are same or not
  if (password !== cnf) {
    flag = false;
    return toast.error('Not matched Password');
  }

  if (flag) {
    // if at top there is no existing users than definitely compiler will come down and we push new user in array with existing users
    let userObj = { name, email, password };
    ArrayUser.push(userObj);
    localStorage.setItem('users', JSON.stringify(ArrayUser));
    console.log(ArrayUser);

    //cart is stored in local storage
    let emails = email;
    let cartObj = [emails];
    watchList.push(cartObj);
    localStorage.setItem('UsersList', JSON.stringify(watchList));
    console.log(watchList);
  }
  return flag;
};