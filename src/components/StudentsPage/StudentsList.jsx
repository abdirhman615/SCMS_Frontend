// import { Box, Button ,IconButton} from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import React from 'react'
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// export default function StudentList({StudentData,update,DeleteStudent}) {
//      const columns = [
//         { field: '_id', headerName: 'ID', width: 150 },
//         {
//           field: 'Stdname',
//           headerName: 'Student name',
//           width: 150,
//           editable: true,
//         },
//         {
//           field: 'phone',
//           headerName: 'phone',
//           width: 150,
//           editable: true,
//         },
//         {
//           field: 'Address',
//           headerName: 'Address',
//           width: 150,
//           editable: true,
//         },
//         {
//           field: 'Gender',
//           headerName: 'Gender',
//           width: 150,
//           editable: true,
//         },
//         {
//           field: 'Email',
//           headerName: 'Email',
//           width: 150,
//           editable: true,
//         },
//         {
//           field: 'STD_Pass',
//           headerName: 'STD_Pass',
//           width: 150,
//           editable: true,
//         },
//         {
//           field: 'department_id',
//           headerName: 'department_id',
//           width: 150,
//           editable: true,

//           renderCell: (params) => {
//             return <Box> {params.row.department_id.departmentname} {""}
//             {/* <Chip size='small' onClick={ () => seeMore(params.row)} label="See More" variant="outlined"/> */}

//             </Box>
//           }

//         },
//         {
//           field: 'Class_id',
//           headerName: 'Class_id',
//           width: 150,
//           editable: true,

//           renderCell: (params) => {
//             return <Box> {params.row.Class_id.Classname} {""}
//             {/* <Chip size='small' onClick={ () => seeMore(params.row)} label="See More" variant="outlined"/> */}

//             </Box>
//           }

//         },
//         {
//           field:"Actions",
//           headerName:"Actions",
//           width:100,
//           renderCell:(params)=>{

//             return <Box>
//               <IconButton onClick={()=>update(params.row)}>
//                 <BorderColorIcon sx={{color:"primary.main"}}/>
//               </IconButton>
//               <IconButton onClick={()=>DeleteStudent(params.row)}><DeleteForeverIcon sx={{color:"error.main"}} /></IconButton>
              
//             </Box>
//           }
//         },

        


      
//       ];

      

//       const rows= StudentData ? StudentData : null
    

//   return (
//    <>
//        <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
    
//         rows={rows}
//         columns={columns}

//         // material ui datagrid ma support gareenaayo by default _id 
//         //  si aan u xalino taas waxaan default row id  datagrid id to _id u badalno
//         getRowId={(row) => row._id}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         pageSizeOptions={[5]}
     
//         disableRowSelectionOnClick
//       />
//     </Box>
//    </>
//   )
// }





import { Box, Button ,IconButton ,Typography ,Divider ,Avatar} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React ,{ useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Chip from '@mui/material/Chip';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function StudentList({StudentData,update,DeleteStudent}) {

  const [dailOpen, setdailOpen] = useState(false);
  const [Xogta, setXogta] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };


  // const Toggle = () => {
  //   setdailOpen(!open);
  // };
  const seeMore = (data)=>{
    
    setXogta(data)
    handleClickOpen()
  }
 

  
    const columns = [

        { field: '_id', headerName: 'ID', width: 200 },

        {
            headerName: "Student Name",
              
              width: 300,
              editable: true,
                
      renderCell: (params) => {
                return <Box> {params.row.Stdname} {" "}
                <Chip size='small' sx={{color:"primary.main"}} onClick={ () => seeMore(params.row)} label="See More..." variant="outlined"/>
    
                </Box>
              }
            },

        // {
        //   field: 'Stdname',
        //   headerName: 'Student name',
        //   width: 150,
        //   editable: true,
       
        // },
        
         
        // {
        //   field: 'phone',
        //   headerName: 'phone',
        //   width: 100,
        //   editable: true,
        // },
        // {
        //   field: 'Address',
        //   headerName: 'Address',
        //   width: 200,
        //   editable: true,
        // },
        // {
        //   field: 'Gender',
        //   headerName: 'Gender',
        //   width: 150,
        //   editable: true,
        // },
        // {
        //   field: 'Email',
        //   headerName: 'Email',
        //   width: 150,
        //   editable: true,
        // },
        // {
        //   field: 'STD_Pass',
        //   headerName: 'STD_Pass',
        //   width: 150,
        //   editable: true,
        // },
        {
          field: 'department_id',
          headerName: 'department Name',
          width: 150,
          editable: true,

          renderCell: (params) => {
            return <Box> {params.row.department_id.departmentname} {""}
            </Box>
          }
        },
        {
          field: 'Class_id',
          headerName: 'Class Name',
          width: 100,
          editable: true,

          renderCell: (params) => {
            return <Box> {params.row.Class_id.Classname} {""}
            </Box>
          }
        },
        
        {
          field:"Actions",
          headerName:"Actions",
          width:90,
          renderCell:(params)=>{

            return <Box>

              <IconButton onClick={()=>update(params.row)}>

                <BorderColorIcon sx={{color:"primary.main"}}/>
              </IconButton>
              <IconButton onClick={()=>DeleteStudent(params.row)}><DeleteForeverIcon sx={{color:"error.main"}} /></IconButton>
              
            </Box>
          }
        },

        


      
      ];

      

      const rows= StudentData ? StudentData : null
    

  return (
   <>
       <Box sx={{ height: 400, width: '100%' }}>

       <Dialog
        // open={dailOpen}
        // onClose={Toggle}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {/* {Xogta?.typekisa} */}
        Name : {" "} {Xogta?.Stdname} {" | "}
        {/* id : {" "} {Xogta?._id} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{p:2}}>
              <Box sx={{display:'flex',gap:5,alignItems:"center",width:"300px"}}><Typography variant='h6'>phone : </Typography>
                
                <Box>
                {Xogta?.phone}
                </Box>
              </Box>
              <Divider/>
            </Box>
            <Box sx={{p:2}}>
              <Box sx={{display:'flex',gap:5,alignItems:"center",width:"300px"}}><Typography variant='h6'>Address : </Typography>
                
                <Box>
                {Xogta?.Address}
                </Box>
              </Box>
              <Divider/>
            </Box>
            <Box sx={{p:2}}>
              <Box sx={{display:'flex',gap:5,alignItems:"center",width:"300px"}}><Typography variant='h6'>Gender : </Typography>
                
                
                {Xogta?.Gender}
                </Box>
             
              <Divider/>
            </Box>
            <Box sx={{p:2}}>
              <Box sx={{display:'flex',gap:5,alignItems:"center",width:"300px"}}><Typography variant='h6'>Email : </Typography>
                
                
                {Xogta?.Email}
                </Box>
              
              <Divider/>
            </Box>
            <Box sx={{p:2}}>
              <Box sx={{display:'flex',gap:2,alignItems:"center",width:"300px"}}><Typography variant='h6'>STD_Pass : </Typography>
                
                <Box>
                {Xogta?.STD_Pass}
                </Box>
              </Box>
              <Divider/>
            </Box>
            {/* <Box sx={{p:2}}>
              <Box sx={{display:'flex',gap:5,alignItems:"center",width:"300px"}}><Typography variant='h6'>department Name : </Typography>
                
                <Box>
                {Xogta?.department_id}
                </Box>
              </Box>
              <Divider/>
            </Box> */}
            {/* <Box sx={{p:2}}>
              <Box sx={{display:'flex',gap:5,alignItems:"center",width:"300px"}}><Typography variant='h6'>Class_id : </Typography>
                
                <Box>
                {Xogta?.Class_id}
                </Box>
              </Box>
              <Divider/>
            </Box> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>


      <DataGrid
    
        rows={rows}
        columns={columns}

        // material ui datagrid ma support gareenaayo by default _id 
        //  si aan u xalino taas waxaan default row id  datagrid id to _id u badalno
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
     
        disableRowSelectionOnClick
      />
    </Box>
   </>
  )
}