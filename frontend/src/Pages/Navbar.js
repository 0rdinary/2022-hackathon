import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom";
import Icon from "../Images/Daeily_Icon.png"

function Navbar(){
    return(
        <div>
        <AppBar position="static" style={{ background: '#FFFFFF' }} >
            <Toolbar>
                <div>
                    <Link to="/">
                        <img src={Icon}/>
                    </Link>
                <IconButton>
                    <MenuIcon/>
                </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default Navbar;