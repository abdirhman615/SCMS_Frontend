
import { Box ,Stack,Typography,Drawer} from "@mui/material"
//import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import ClassIcon from '@mui/icons-material/Class';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactsIcon from '@mui/icons-material/Contacts';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
//import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
//import { useState } from "react";

// import StarBorder from '@mui/icons-material/StarBorder';
 import { Link } from "react-router-dom";
import { useState } from "react";

// import Link from '@mui/material/Link';
// // or
// import { Link } from '@mui/material';
export const Sidebar = ({DrawerOpen,DrawerClose})=>{ 
  const [selectedMenu,setMenu]=useState('')
    return<>
<Drawer
open={DrawerOpen}
onClose={DrawerClose}
>
<Box sx={{width:"300px"}}> 
<Box sx={{p:2}}>

<Stack direction={'row'} spacing={1}>
<Box>
<AddHomeWorkIcon sx={{color:"green",height:30, fontSize:50 }} />

</Box>

<Box><Typography variant="h6" > BetaHouse</Typography></Box>
</Stack>
</Box>
    
  {/* Menu */}
  
    <Box>
   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav" >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <Link to={'Home'}>
      <ListItemButton
      sx={[selectedMenu === 'Home' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('Home')
        DrawerClose()
      }}>
        <ListItemIcon>
          <DraftsIcon sx={[selectedMenu==='Home' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      </Link>
      <Link to={'department'}>
      <ListItemButton
      sx={[selectedMenu === 'department' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('department')
        DrawerClose()
      }}>
        <ListItemIcon>
          <DraftsIcon sx={[selectedMenu==='department' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="department" />
      </ListItemButton>

      </Link>


      <ListItemButton sx={[selectedMenu === 'home' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('home')
        DrawerClose()

      }}>
        <ListItemIcon>
          <InboxIcon  sx={[selectedMenu==='home' && {color:"white"}]}  />
        </ListItemIcon>
        <ListItemText primary="home" />
        
      </ListItemButton>
     


      <ListItemButton >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Images" />
        
      </ListItemButton>

      <ListItemButton >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Services" />
        
      </ListItemButton>

<Link to={'client'}>
      <ListItemButton sx={[selectedMenu === 'client' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('client')
        DrawerClose()

      }}>
        <ListItemIcon>
          <InboxIcon  sx={[selectedMenu==='client' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Clients" />
        
      </ListItemButton>
      </Link>
      <ListItemButton >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Contacts" />
        
      </ListItemButton>

    </List>
    </Box> 
    </Box>
</Drawer>
{/* big screen menu */}
    <Box sx={{width:"300px",height:"100vh",display:{
        xs:"none",
       
        md:"block"
    },borderRight:1,borderColor:"#eee"}}> 
  

<Box sx={{p:4}}>


</Box>
    
    


    {/* Menu list */}
    

   
    <Box>
   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
 
    >
      <ListItemButton >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    
    
    <Link to={'Faculty'} style={{textDecoration:"none",color:"black"}}>
      <ListItemButton onClick={()=>setMenu('Faculty')}  sx={[ selectedMenu==='Faculty' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}>
        <ListItemIcon>
          <LocalLibraryIcon sx={[ selectedMenu==='Faculty' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Faculty" />
      </ListItemButton>

      </Link>
    <Link to={'Department'} style={{textDecoration:"none",color:"black"}}>
      <ListItemButton onClick={()=>setMenu('Department')}  sx={[ selectedMenu==='Department' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}>
        <ListItemIcon>
          <GroupsIcon sx={[ selectedMenu==='Department' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Department" />
      </ListItemButton>
      
      </Link>



      <Link to={'Class'} style={{textDecoration:"none",color:"black"}}>
      <ListItemButton
      sx={[selectedMenu ==='Class' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}
      onClick={()=>setMenu('Class')} >
        <ListItemIcon>
          <ClassIcon sx={[selectedMenu === 'Class' && {color:"white"}]}/>
        </ListItemIcon>
        <ListItemText primary="Class" />
      </ListItemButton>
</Link>

<Link to={'Student'} style={{textDecoration:"none",color:"black"}}>
      <ListItemButton
      sx={[selectedMenu ==='Student' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}
      onClick={()=>setMenu('Student')} >
        <ListItemIcon>
          <GroupAddIcon sx={[selectedMenu === 'Student' && {color:"white"}]}/>
        </ListItemIcon>
        <ListItemText primary="Student" />
       
      </ListItemButton>
      </Link>

      <Link to={'Complain'} style={{textDecoration:"none",color:"black"}}>
      <ListItemButton
      sx={[selectedMenu ==='Complain' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}
      onClick={()=>setMenu('Complain')} >
        <ListItemIcon>
          <AssignmentIndIcon sx={[selectedMenu === 'Complain' && {color:"white"}]}/>
        </ListItemIcon>
        <ListItemText primary="Complain" />
        
      </ListItemButton>

      </Link>

      <Link to={'Reply'} style={{textDecoration:"none",color:"black"}}>
      <ListItemButton  sx={[selectedMenu ==='Reply' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}
      onClick={()=>setMenu('Reply')} >
        <ListItemIcon>
          <ChatIcon sx={[selectedMenu === 'Reply' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Reply" />
      </ListItemButton>
      </Link>

      <Link to={'User'} style={{textDecoration:"none",color:"black"}}>
      <ListItemButton
      sx={[selectedMenu ==='User' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}
      onClick={()=>setMenu('User')} >
        <ListItemIcon>
          <ContactsIcon sx={[selectedMenu === 'User' && {color:"white"}]}/>
        </ListItemIcon>
        <ListItemText primary="User" />
        
      </ListItemButton>
    </Link>
    </List>
    </Box>  
    </Box>
    </>
}