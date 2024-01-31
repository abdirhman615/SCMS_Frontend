import { Box, Stack, IconButton, Typography, Alert, TextField, Button, Divider, Breadcrumbs, Link } from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import UsersList from '../UsersPage/UsersList';
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmDelete from "../../../CustomHooks/deleteComponent/ConfirmDelete";
import { useDeleteHook } from "../../../CustomHooks/deleteComponent/deleteHooks";
import { GetQuery, PostQuery, UpdateQuery, DeleteQuery } from '../../../Shared/ReactQuery'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import axios from "axios"

export const Users = ()=>{

  const YupValidate = yup.object({
    username: yup.string().required('Enter The username'),
    Password: yup.string().required("Enter The Password"),
    usertype: yup.string().required("Enter The usertype"),
    userStatus: yup.string().required("Enter The userStatus"),
    dar: yup.string().required("Enter The user dar"),
    Faculty_id: yup.string().required("Enter The user Faculty_id"),

  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(YupValidate) })
  const [EditId, setEditId] = useState('')
  const queryclient = useQueryClient();
  const [UserDelId, setUserDelId] = useState("")
  const[subcat,setsubcat]= useState([])
  const [facultyval,setfacultyval]=useState('')
  const [dailogOpen, setDailog] = useState(false)
  const ToggleDailog = () => {
    setDailog(!dailogOpen)
  }
  const onClear = () => {
    setEditId('')
  }

  
  useEffect(() =>{
    const subget= async()=>{
        const facultylist=await axios.get('http://localhost:5000/Faculty')
        
        const facultyval=await facultylist.data.AllFaculty
        
        setsubcat(facultyval)
console.log(facultyval)
    }
    subget()

}, [])

  const { data: User, isLoading, isError } = GetQuery('/User', 'User')
  // console.log(service?.data)


  const { mutateAsync, isloading: mutateLoading } = PostQuery("/User", "User")

  const { mutateAsync: updateMutate } = UpdateQuery(`/User/${EditId}`, "User")

  const AddNewUser = async (data) => {

    if (EditId !== '') {

      try {
        // console.log(data)
        //   update section
        updateMutate(data).then(() => {
          toast.success("data has been updated successfully")
        })
        // console.log("Data has been Updated")
        ToggleDailog()
        reset()
        setEditId('')
      } catch (err) {
        console.log("error ayaa jira ", err)

      }
    }
    else {
      try {
        mutateAsync(data).then(() => {
          toast.success("data has been inserted successfully")

        })
        // await AddClient(data)

        ToggleDailog()
        reset()
      } catch (err) {
        console.log("error ayaa jira ", err)

      }

    }



  }


  const UpdateUserInfo = async (data) => {
    // console.log("xogta la rabbo in la update gareeyo",data)
    setValue("username", data.username)
    setValue("Password", data.Password)
    setValue("usertype", data.usertype)
    setValue("userStatus", data.userStatus)
    setValue("dar", data.dar)
    setValue("Faculty_id", data.Faculty_id)
    setEditId(data._id)
    ToggleDailog()

  }


  const { mutate: delateMutate } = DeleteQuery(`/User/${UserDelId}`, "User")

  const DeleteHook = useDeleteHook()

  const DeleteCheck = () => {
    delateMutate(UserDelId)

  }

  const DeleteUserInfo = async (data) => {
    DeleteHook.setMessage(data.username)
    DeleteHook.Toggle();
    setUserDelId(data._id)
    reset()


  }

  return <>
    <Box p={4}>
      <ConfirmDelete open={DeleteHook.open} toggle={DeleteHook.Toggle} message={DeleteHook.message} confirm={DeleteCheck} />

      {/* breadcrumbs */}

      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Dashboard
        </Link>

        <Typography color="text.primary">Users</Typography>
      </Breadcrumbs>


      {/* end */}
      <Alert severity="info">Users</Alert>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} my={4}>
        <Typography variant="h6">Users List</Typography>

        <IconButton onClick={ToggleDailog}>
          <ControlPointIcon  />
        </IconButton>
      </Box>

      <Dialog sx={{
        backdropFilter: "blur(5px) sepia(5%)",
      }} PaperProps={{ sx: { borderRadius: "20px" } }} open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }}>New User</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewUser)}>
          <DialogContent >
            <Box sx={{ width: "400px" }} mt={2}>



              <Stack spacing={2} direction={'column'}>



                <TextField label="username" {...register("username")} variant="outlined" size="small" fullWidth />
                {errors.username ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.username.message}
                  </Typography>
                ) : null}

                <TextField label="Password" variant="outlined" {...register("Password")} size="small" fullWidth />
                {errors.Password ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Password.message}
                  </Typography>
                ) : null}

{/* 
<TextField label="usertype" variant="outlined" {...register("usertype")} size="small" fullWidth /> */}

<FormControl sx={{px: 1}}>
  <FormLabel size="small" fullWidth id="demo-controlled-radio-buttons-group">User Type</FormLabel>
  <RadioGroup
    row
    aria-labelledby="demo-row-radio-buttons-group-label"
    name="row-radio-buttons-group"
  >
    <FormControlLabel  variant="outlined" {...register("usertype")} size="small" fullWidth value="admin" control={<Radio />} label="Admin" />
    <FormControlLabel  variant="outlined" {...register("usertype")} size="small" fullWidth value="faculty" control={<Radio />} label="Faculty" />
  </RadioGroup>
  {errors.usertype ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.usertype.message}
                  </Typography>
                ) : null}
</FormControl>

              
{/* 
<TextField label="userStatus" variant="outlined" {...register("userStatus")} size="small" fullWidth /> */}

<FormControl sx={{px:1}}>
  <FormLabel  fullWidth id="demo-controlled-radio-buttons-group">User Status</FormLabel>
  <RadioGroup
    row
    aria-labelledby="demo-row-radio-buttons-group-label"
    name="row-radio-buttons-group"
  >
    <FormControlLabel  variant="outlined" {...register("userStatus")} size="small" fullWidth value="active" control={<Radio />} label="Active" />
    <FormControlLabel  variant="outlined" {...register("userStatus")} size="small" fullWidth value="pending" control={<Radio />} label="Pending" />
    <FormControlLabel  variant="outlined" {...register("userStatus")} size="small" fullWidth value="blocked" control={<Radio />} label="Blocked" />
  </RadioGroup>
  {errors.userStatus ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.userStatus.message}
                  </Typography>
                ) : null}
</FormControl>

               
<TextField type="date"  variant="outlined" {...register("dar")} size="small" fullWidth />
                {errors.dar ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.dar.message}
                  </Typography>
                ) : null}


<FormControl >
<InputLabel id="demo-multiple-name-label">Faculty name</InputLabel>
  <Select label="Faculty id" variant="outlined" {...register("Faculty_id")} size="small" fullWidth>
    
  {subcat.map((facultyval) => (
    <MenuItem key={facultyval._id} value={facultyval._id}>
      {facultyval.Facultyname}
    </MenuItem>
  ))}
</Select>
</FormControl>


              </Stack>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              ToggleDailog();
              reset();
              onClear();
            }}>Cancel</Button>
            <Button variant="contained" disabled={mutateLoading} sx={{ bgcolor: "primary.main" }} type="submit" size="small">

              {EditId !== '' ? "Update" : "Submit"}
            </Button>

          </DialogActions>
        </Box>
      </Dialog>

      <Divider />

      {isError ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: "center", p: 10 }}>


          <Box>
            <ErrorOutlineOutlined sx={{ fontSize: "58px" }} />
            <Typography > No Data fetched !</Typography>
          </Box>


        </Box>) : isLoading ? (<Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: "center", p: 10 }}>

          <Box>

            <CircularProgress sx={{ fontSize: "58px" }} />
            <Typography >Loading...</Typography>
          </Box>

        </Box>) : <UsersList deleteUser={DeleteUserInfo} UsersData={User?.data.Alluser} updateUser={UpdateUserInfo} />}

    </Box>
  </>
}
