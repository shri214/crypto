import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ListIcon from "@mui/icons-material/List";
import { useEffect } from 'react';

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer() {
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (
      !localStorage.getItem('users') &&
      window.location.pathname === '/dashboard'||'/watch'||'/compare'
    ) {
      navigation('/sign');
    } else if (
      !localStorage.getItem('loginUser') &&
      window.location.pathname === '/dashboard'||'/watch'||'/compare'
    ) {
      navigation('/login');
    } 
  }, []);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <ListIcon />
      </Button>
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div className="phone-list">
          <NavLink to="/" className="item">
            Home
          </NavLink>
          <NavLink to="/compare" className="item">
            Compare
          </NavLink>
          <NavLink to="/watch" className="item">
            WatchList
          </NavLink>

          <button
            onClick={() => navigation("/login")}
            className="dash-back"
            style={{ color: "black" }}
          >
            Login
          </button>
          <button
            onClick={() => navigation("/sign")}
            className="dash-back"
            style={{ color: "black" }}
          >
            Sing Up
          </button>
          <button
            onClick={() => navigation("/profile")}
            className="dash-back"
            style={{ color: "black" }}
          >
            Logout
          </button>
          <button onClick={() => navigation("/dashboard")} className="dash">
            Dashboard
          </button>
        </div>
      </Drawer>
    </div>
  );
}
