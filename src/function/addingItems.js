import { toast } from "react-toastify";

export const addingItems = (id) => {
  let arr = [];
  if (localStorage.getItem("item")) {
    arr = JSON.parse(localStorage.getItem("item"));
  }
  arr.push(id);
  console.log("items is added", arr);
  localStorage.setItem("item", JSON.stringify(arr));
  toast.success(`${id.slice(0, 1).toUpperCase() + id.slice(1)} is added`);
};


export const addingItem=(id)=>{
  console.log('is it runnings');
  let login=JSON.parse(localStorage.getItem('loginUser'));
  let users=JSON.parse(localStorage.getItem('UsersList'));
  for (let i = 0; i < users.length; i++) {
    let listName=users[i][0];
    if(listName===login.email){
      if(users[i].length>1){
        let flag=true;
        for(let j =1; j<users[i].length;j++){
          if(users[i][j].id===id){
            flag=false;
            return toast.warn("Item is already added");
          }
        }
        if(flag===true){
          users[i].push(id);
          localStorage.setItem('UsersList', JSON.stringify(users))
        }else{
          console.log('already done');
        }
      }else{
        users[i].push(id);
        localStorage.setItem('UsersList', JSON.stringify(users));
      }
    }
    
  }
  return toast.success('Item added');
}