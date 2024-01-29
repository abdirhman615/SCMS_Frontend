import { Box, Button ,IconButton} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
export default function ComplainList({ComplainData,update,DeleteComplain}) {
     const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        {
          field: 'Student_id',
          headerName: 'Student_id',
          width: 150,
          editable: true,

          renderCell: (params) => {
            return <Box> {params.row.Student_id.Stdname} {""}
            </Box>
          }
        },
        {
          field: 'department_id',
          headerName: 'department_id',
          width: 150,
          editable: true,

          renderCell: (params) => {
            return <Box> {params.row.department_id.departmentname} {""}
            </Box>
          }
        },
        {
          field: 'Class_id',
          headerName: 'Class_id',
          width: 100,
          editable: true,

          renderCell: (params) => {
            return <Box> {params.row.Class_id.Classname} {""}
            </Box>
          }
        },
        {
          field: 'Description',
          headerName: 'Description',
          width: 150,
          editable: true,
        },
        {
          field: 'Complain_date',
          headerName: 'Complain date',
          width: 150,
          editable: true,
        },
        {
          field: 'Status',
          headerName: 'Status',
          default:'New',
          width: 90,
          
        },
        {
          field:"Actions",
          headerName:"Actions",
          width:80,
          renderCell:(params)=>{

            return <Box>
              <IconButton onClick={()=>update(params.row)}>
                <BorderColorIcon sx={{color:"primary.main"}}/>
              </IconButton>
              <IconButton onClick={()=>DeleteComplain(params.row)}><DeleteForeverIcon sx={{color:"error.main"}} /></IconButton>
              
            </Box>
          }
        },

        


      
      ];

      

      const rows= ComplainData ? ComplainData : null
    

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