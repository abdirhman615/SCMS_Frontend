

import { Box, Button ,IconButton} from '@mui/material';
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
export default function DepartmentList({DepartmentData,update,DeleteDepartment}) {
     const columns = [
        { field: 'DEP_ID', headerName: 'ID', width: 250 },
        {
          field: 'departmentname',
          headerName: 'department name',
          width: 250,
          editable: true,
        },
        {
          field: 'Faculty_id',
          headerName: 'Faculty Name',
          width: 250,
          editable: true,

          renderCell: (params) => {
            return <Box> {params.row.Faculty_id.Facultyname} {""}
            {/* <Chip size='small' onClick={ () => seeMore(params.row)} label="See More" variant="outlined"/> */}

            </Box>
          }
        },
        {
          field:"Actions",
          headerName:"Actions",
          width:200,
          renderCell:(params)=>{

            return <Box>
              <IconButton onClick={()=>update(params.row)}>
                <BorderColorIcon sx={{color:"primary.main"}}/>
              </IconButton>
              <IconButton onClick={()=>DeleteDepartment(params.row)}><DeleteForeverIcon sx={{color:"error.main"}} /></IconButton>
              
            </Box>
          }
        },

        


      
      ];

      

      const rows= DepartmentData ? DepartmentData : null
    

  return (
   <>
       <Box sx={{ height: 400, width: '100%' }}>
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