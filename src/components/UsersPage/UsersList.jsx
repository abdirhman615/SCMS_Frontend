import { Box, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function UsersList({ UsersData, updateUser, deleteUser }) {

  console.log(UsersData, 'cluesff')

  const columns = [
    { field: 'USER_ID', headerName: 'ID', width: 90 },
    {
      field: 'username',
      headerName: 'Username',
      width: 180,
      editable: true,
    },
    {
      field: 'Password',
      headerName: 'Password',
      width: 100,
      editable: true,
    },
    {
      field: 'usertype',
      headerName: 'User Type',
      width: 100,
      editable: true,
    },
    {
      field: 'userStatus',
      headerName: 'User Status',
      width: 100,
      editable: true,
    },
    {
      field: 'dar',
      headerName: 'Dete',
      width: 100,
      editable: true,
    },
    {
      field: 'Faculty_id',
      headerName: 'Faculty Name',
      width: 180,
      editable: true,

      renderCell: (params) => {
        return <Box> {params.row.Faculty_id.Facultyname} {""}
        {/* <Chip size='small' onClick={ () => seeMore(params.row)} label="See More" variant="outlined"/> */}

        </Box>
      }
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {

        return <Box>

          <IconButton onClick={() => updateUser(params.row)}>

            <ModeEditIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton onClick={() => deleteUser(params.row)}><DeleteIcon sx={{ color: "error.main" }} /></IconButton>

        </Box>
      }
    },





  ];



  const rows = UsersData ? UsersData : null

  // console.log("rowww", rows)
  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          sx={{ boxShadow: 1 }}

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

