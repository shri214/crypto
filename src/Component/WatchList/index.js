import React, { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../Dashboard/Grid/Grid";
import List from "../Dashboard/List/List";
import Loader from "../Loader";
import BackToTop from "../BackToTop/BackToTop";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { fetchCoins } from "../reduxTK/dataSlice";

const WatchList = () => {
  const [value, setValue] = useState("Grid");
  const [name, setNames] = useState("your");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("UsersList")) || []
  );

  let { loading, data, error } = useSelector((state) => state.data);
  let a = useSelector((state) => state.item);
  let user = JSON.parse(localStorage.getItem("loginUser"));

  console.log(a);
  let dispatch = useDispatch();

  let navigation = useNavigate();
  let crypto = [];
  useEffect(() => {
    if (!localStorage.getItem("loginUser")) {
      navigation("/login");
    } else {
      setNames(user.name);
    }
    dispatch(fetchCoins());
  }, []);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("UsersList")));
  }, [a]);

  
  if (localStorage.getItem("UsersList")) {
    for (let i = 0; i < items.length; i++) {
      if(items[i][0]===user.email){
        crypto=items[i];
      }
      
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const themes = createTheme({
    palette: {
      primary: { main: "#3A80E9" },
    },
  });

  // use this obj as a style in tabs
  const style = {
    color: "var(--white)",
    fontFamily: "Intern",
    fontWeight: 600,
  };

  console.log(crypto);
  return (
    <>
      {crypto.length <= 1 ? (
        <div className="noItem">
          <h1>{name} Watch List Empty</h1>
          <div className="btns">
            <Button
              clName={"dash"}
              text={"Dashboard"}
              onClick={() => navigation("/dashboard")}
            />
          </div>
        </div>
      ) : (
        <div>
          <BackToTop />
          <ThemeProvider theme={themes}>
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
              >
                <Tab label="Grid" value="Grid" sx={style} />
                <Tab label="List" value="List" sx={style} />
              </TabList>

              <TabPanel value="Grid">
                <div className="Grid-grid">
                  {data
                    .filter((ele) => crypto.includes(ele.id))
                    .map((ele, ind) => {
                      // ele['watch'] = true;

                      return <Grid ele={ele} ind={ind} />;
                    })}
                </div>
              </TabPanel>
              <TabPanel value="List">
                <table className="list-grid">
                  {data
                    .filter((ele) => crypto.includes(ele.id))
                    .map((ele, ind) => {
                      // ele['watch'] = true;
                      return <List ele={ele} ind={ind} />;
                    })}
                </table>
              </TabPanel>
            </TabContext>
          </ThemeProvider>
        </div>
      )}
    </>
  );
};
export default WatchList;
