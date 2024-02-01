import { Box,Stack,IconButton,Typography,Button ,Avatar } from "@mui/material"
import { LoginOutlined } from "@mui/icons-material";

import {Sidebar} from "./SideBar";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
// import Clients from "../components/ClientPage/Clients";
import { Outlet } from "react-router-dom";
import MuiDrawer from '@mui/material/Drawer';
import { shadows } from '@mui/system';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useUserContext } from "../ContextApi/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';

import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';

// import MenuIcon from '@mui/icons-material/Menu';

import EmailIcon from '@mui/icons-material/Email';
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
//import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
//import Grid from '@mui/material/Grid';
//import Paper from '@mui/material/Paper';
//import Link from '@mui/material/Link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';



// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// export default function Dashboard(){
// const [draweOpen,setDrawer]=useState(false)
//  const {email,LogOut} = useUserContext()

// const [DialOpen, setDial] = useState(false);
// const Toggle = () => {
//     setDial(!DialOpen)
// }

// const handleCheck = ()=>{
// <Box>
//     <Dialog
//     open={DialOpen}
//     onClose={Toggle}
//     aria-labelledby="alert-dialog-title"
//     aria-describedby="alert-dialog-description"
//     sx={{
//         backdropFilter: "blur(5px) sepia(5%)",
//     }} PaperProps={{ sx: { borderRadius: "20px" } }}
// >
//     <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }} id="alert-dialog-title">
//         {/* Type : {" "}{houseDatta?.Type}  {" || "} Status: {"  "} {houseDatta?.Status} */}
//         <h1>checkgareen</h1>
//     </DialogTitle>
//     <DialogContent>
//         <DialogContentText id="alert-dialog-description">

//             <h1>do you want to log out</h1>

//         </DialogContentText>
//     </DialogContent>
//     <DialogActions>

//         <Button sx={{ color: "primary.dark" }} onClick={Toggle}>Close</Button>

//     </DialogActions>
// </Dialog>

// </Box>

// }
// const ToggleDrawer = ()=>{
// setDrawer(!draweOpen)
// }
//     return <>
//       <Box>

// <Stack direction={'row'}>

// <Sidebar DrawerOpen={draweOpen} DrawerClose={ToggleDrawer}/>
// {/* content box */}
// <Box sx={{width:"100%"}}>
// {/* top header */}

// <Box sx={{bgcolor:"primary.main",boxShadow: 3,color:"white",display:"flex",justifyContent:{
//     xs:"space-between",
//     md:"end"
// }}} p={2}>
    
// <IconButton sx={{p:0,display:{
//     xs:"block",
//     md:"none"
// }}} onClick={()=>ToggleDrawer()}>
//     <MenuIcon sx={{color:"primary.dark"}}/>
// </IconButton>
// <Stack spacing={2} direction={'row'}>
// <AccountCircleIcon sx={{marginTop:"1px",}}/>
// {/* <Typography >  User : {email}</Typography>
// <IconButton sx={{p:0}} onClick={LogOut}>
//     <LogoutIcon sx={{color:"primary.dark"}}/>
// </IconButton> */}
// </Stack>
// </Box>

// {/* top header end */}

// {/* content pages */}
// {/* <Clients/> */}
// {/* <Gallery/> */}

// {/* end content */}

// <Outlet/>
 
// </Box>
// </Stack>
//       </Box>

//     </>
// }
function Body(props) {
    return (
        <>
        {/* <Faculty/>
        <Divider />
        <Guryaha/>
        <Divider />
        <Images/>
        <Divider />
        <Services/>
        <Divider />
        <Contacts/> */}
        <Outlet/> 
       
        </>
    );
  }
  
  const drawerWidth = 250;
 
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
 
 
 
  const defaultTheme = createTheme();
  export default function Dashboard(){
   const {email,LogOut} = useUserContext()
 const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
 // const [draweOpen,setDrawer]=useState(false)
 const [draweOpen,setDrawer]=useState(false)
 
 const ToggleDrawer = ()=>{
 setDrawer(!draweOpen)
 
 }
 return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        
        <CssBaseline />
        
        
        <AppBar position="absolute" open={open}>
          
          {/* <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="#47b7cd"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton><EmailIcon/>
            <Typography
              component="h3"
              variant="h6"
              color="white"
              noWrap
              sx={{ flexGrow: 4 }}
            >
               
             BetaHouse@gmail.com
            </Typography>
            <IconButton color="primary.main">
            </IconButton>
          </Toolbar> */}
 
 
           <Box sx={{bgcolor:"cagar.main",color:"white",display:"flex",justifyContent:{
     xs:"space-between",
    md:"start"
 }}} p={2}>
 
 <Typography >  User : {email}</Typography>
 <IconButton sx={{p:0,display:{
     xs:"block",
     md:"none"
 }}} onClick={()=>ToggleDrawer()}>
  
     <MenuIcon sx={{color:"white"}}/>
 </IconButton>
 
 <IconButton
              edge="start"
              color="primary.main"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '133px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
           
            <Typography
              component="h3"
              variant="h6"
              color="white"
          
            >
              
               
               
              
 <Box sx={{marginLeft  :"800px"}}>
            <IconButton sx={{p:0}} onClick={()=>LogOut()}>
              <LoginOutlined sx={{color:"white"}}/>
            </IconButton>
 </Box>
 
            </Typography>
      
 </Box>
 
        </AppBar>
 
 
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Stack direction={'row'} spacing={5}>
 <Box >
 <Avatar alt="Remy Sharp"  sx={{  width: 70, height:70 }} src="../../logo/logo.png" />
 
 </Box>
 
 <Box>
    {/* <Typography variant="h6" >SIU</Typography> */}
 </Box>
 </Stack>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Sidebar DrawerOpen={draweOpen} DrawerClose={ToggleDrawer}/>
          
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[400],
            flexGrow: 3,
            height: '200vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
            <Body sx={{ pt: 2 }} />
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
 }