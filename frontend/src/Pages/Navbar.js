import React from "react";
import { AppBar, Toolbar, IconButton, Grid} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Icon from "../Images/Daeily_Icon.png";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha("#D91438", 0.15),
    '&:hover': {
      backgroundColor: alpha("#D91438", 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch'
      },
    },
  }));

function Navbar(){
    return(
        <div>
        <AppBar position="static" style={{ background: '#FFFFFF' }}>
            <Toolbar>
                <div>
                  <Grid container alignItems="stretch">
                    <Grid item xs>
                    <Link to="/">
                        <img src={Icon}/>
                    </Link>
                    </Grid>
                    <Grid item xs>
                    <Link to="/board">
                        Board
                    </Link>
                    </Grid>
                    <Grid item xs>
                    <Link to="/proposal">
                        Proposal
                    </Link>
                    </Grid>
                    <Grid item xs>
                    <Search>
                        <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                     </Search>
                     </Grid>
                     <Grid item xs>
                <IconButton>
                    <MenuIcon/>
                </IconButton>
                </Grid>
                </Grid>
                </div>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default Navbar;