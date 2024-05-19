import { toast } from "react-toastify";

// export const removeItem = (id) => {
//   if (window.confirm("Are you sure want to remove this coin")) {
//     let arr = JSON.parse(localStorage.getItem("item"));
//     localStorage.setItem(
//       "item",
//       JSON.stringify(arr.filter((val) => val != id))
//     );
//     console.log("item is removed", id);
//     toast.success(`${id.slice(0, 1).toUpperCase() + id.slice(1)} is remove`);
//   } else {
//     toast.error("couldn't remove the coin");
//   }
// };

export const removeItems=(id)=>{
  console.log('is it remove');
  if (window.confirm("Are you sure want to remove this coin")) {
    let users = JSON.parse(localStorage.getItem("UsersList"));
    let login = JSON.parse(localStorage.getItem("loginUser"));

    for (let i = 0; i < users.length; i++) {
      let listName = users[i][0];
      if (listName === login.email) {
        for (let j = 1; j < users[i].length; j++) {
          console.log(users[i][j]);
          if (users[i][j] === id) {
            users[i].splice(j, 1);
          }
        }
      }
    }
    localStorage.setItem('UsersList', JSON.stringify(users)); 
    console.log("item is removed", id);
    toast.success(`${id.slice(0, 1).toUpperCase() + id.slice(1)} is remove`);
  } else {
    toast.error("couldn't remove the coin");
  }
}

