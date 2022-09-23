import React from "react";
import { AppBar, Toolbar, IconButton, Grid} from "@mui/material";
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { Link } from "react-router-dom";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Icon from "../Images/Daeily_Icon.png";
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

var directionLink = ["/board", "/proposal", "/profile", "/proposal/write"]
var board_name = ["문화/관광/체육", "교통", "복지", "여성/가족/교육",
                 "건강/보건/위생", "산업/경제", "환경", "소방/안전",
                 "도시주택/건설", "행정/재정/세정", "자유게시판"]
                 var tag_name = ["culture", "traffic", "welfare", "education", "health", "economy",
                                 "environment", "safety", "construction", "administration"];

function Navbar(){
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
      setOpen(false);
    }

    return (
      <Box class="Navbar" sx={{ display: 'flex'}}>
        <AppBar elevation={1} position="static" open={open} style={{ background: '#D91438'}}>
          <Toolbar class="Header">
            <Link to= "/">
              <img src={Icon}/>
            </Link>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {board_name.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <Link to={directionLink[index]}>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon/>
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['내정보'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </AppBar>
      </Box>
    )
}

export default Navbar;