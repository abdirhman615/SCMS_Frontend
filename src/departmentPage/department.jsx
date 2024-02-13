import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import DepartmentList from "./departmentList";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
// import SweetAlert from 'react-bootstrap-sweetalert';
// import { MDBDataTable } from "mdbreact"
import { AddCircleOutlineSharp ,ErrorOutlineOutlined} from "@mui/icons-material";
import { Link } from "react-router-dom";
// import {
//   useMutation,
//     useQuery,
//     useQueryClient
//   } from '@tanstack/react-query'
import ConfirmDelete from "../../CustomHooks/deleteComponent/ConfirmDelete";
import {  useDeleteHook } from "../../CustomHooks/deleteComponent/deleteHooks";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {GetQuery,PostQuery,UpdateQuery,DeleteQuery} from '../../Shared/ReactQuery'

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const Department = ()=>{
    const YupValidate = yup.object({
        DEP_ID: yup.string().required('Enter The Department ID'),
        departmentname: yup.string().required('Enter The Department Name'),
        Faculty_id: yup.string().required("Enter The Faculty id"),
      });
    
      const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({ resolver: yupResolver(YupValidate) })



    const [dailogOpen,setDailog]=useState(false)
    // const queryclient = useQueryClient();
    const [Departmentdeleteid,setDepartmentdeleteid]=useState('')
    const [DepartmentId,setDepartmentId]=useState('')
    const[subcat,setsubcat]= useState([])
    const [facultyval,setfacultyval]=useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [apiData, setapiData] = useState("")      
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }



    useEffect(() =>{
        const baseURL =import.meta.env.VITE_APP_API_URL
        const subget= async()=>{
            const facultylist=await axios.get(`${baseURL}/Faculty`)
          //  const facultylist=await axios.get('https://backend-scms.vercel.app/Faculty')
            
            
            const facultyval=await facultylist.data.AllFaculty
            
            setsubcat(facultyval)
console.log(facultyval)
        }
        subget()

    }, [])

// const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()

   
// useEffect(()=>{
//     const subget= async()=>{
//         const sublist=await getAllClient()
//         const subdata=await sublist.data.AllOutClient
//         setDepartment(subdata)
//      console.log("subdata",subdata)

   
//     }
//     subget()


// },[])

const {data:Department,isLoading,isError}= GetQuery('/department','Department')

const {mutate,isLoading:mutateLoading} = PostQuery('/department','Department')

const {mutate:updateMutate,isLoading:updateLoading} = UpdateQuery(`/department/${DepartmentId}`,'Department')
 
const {mutate:deleteMutate} = DeleteQuery(`/department/${Departmentdeleteid}`,'Department')

//  console.log("data",Department.data.Alldepartment,Faculty_id.facultyname)

const AddNewDepartment = async (data)=>{

    if(DepartmentId !==''){

 try{
//   await UpdateClient(DepartmentId,subdata)
// console.log("Data has been Updated")
 toast.success("Data has been Updated")
 ToggleDailog()
 updateMutate(data)
reset()
    } catch( err){
        console.log("error ayaa jira ",err)
        toast.error(err.message)
    }
    }
    else {
        try{
        //     await AddClient(subdata)
        //   console.log("Data has been saved")
        //   toast.success("Data has been saved")
        mutate(data)
          ToggleDailog()
          reset()
              } catch( err){
          console.log("error jiro ",err)
          toast.error(err.message)
              }

    }
    

   
}

const UpdateDepartmentInfo = async (data)=>{
// console.log("xogta la rabbo in la update gareeyo",data)
    setValue("DEP_ID",data.DEP_ID)
    setValue("departmentname",data.departmentname)
    setValue("Faculty_id",data.Faculty_id)
    setDepartmentId(data._id)
    ToggleDailog()

}


// const deleteDepartmentInfo = async (subdata)=>{
//     setshowAlert(true)       
// }


const deletehook = useDeleteHook()

const deleteCheck = ()=>{
    deleteMutate(Departmentdeleteid)
    deletehook.Toggle()
   
}

const deleteDepartmentInfo = async (data)=>{
   deletehook.setMessage(data.departmentname)
    deletehook.Toggle()
    setDepartmentdeleteid(data._id)
}



    return <>
   <Box p={4}>

   <ConfirmDelete open={deletehook.open} toggle={deletehook.Toggle} message={deletehook.message} confirm={deleteCheck} />
 <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="#">
    Dashboard
  </Link>
  <Typography color="text.primary">Department</Typography>
</Breadcrumbs>
 <Divider sx={{height:10}}/>
    <Alert severity="info">Our Department</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={2}>
        <Typography variant="h6">List Department</Typography>
        <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
    </Box>
    <Dialog sx={{
        backdropFilter: "blur(5px) sepia(5%)",
      }} PaperProps={{ sx: { borderRadius: "20px" } }} open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }}>New Department</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewDepartment)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={3} direction={'column'}>



<TextField label="Department ID" {...register("DEP_ID")} variant="outlined" size="small" fullWidth/>
{errors.DEP_ID ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.DEP_ID.message}
                  </Typography>
                ) : null}
<TextField label="Department name" {...register("departmentname")} variant="outlined" size="small" fullWidth/>
{errors.departmentname ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.departmentname.message}
                  </Typography>
                ) : null}
{/* <TextField label="Faculty id" variant="outlined" {...register("Faculty_id")} size="small" fullWidth/> */}
<FormControl >
<InputLabel id="demo-multiple-name-label">Faculty name</InputLabel>
  <Select label="Faculty id" variant="outlined" {...register("Faculty_id")} size="small" fullWidth>
    
  {subcat.map((facultyval) => (
    <MenuItem key={facultyval._id} value={facultyval._id}>
      {facultyval.Facultyname}
    </MenuItem>
  ))}
</Select>
{errors.Faculty_id ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Faculty_id.message}
                  </Typography>
                ) : null}
</FormControl>




{errors.facultyname && <Alert severity="error">{errors.facultyname.message}</Alert> }

    
    
    </Stack>

    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ToggleDailog}>Cancel</Button>
          <Button variant="contained" disabled={mutateLoading} sx={{bgcolor:"primary"}} type="submit"  size="small">

      {DepartmentId !=='' ? "Update" : "Submit"}
          </Button>
 
        </DialogActions>

        </Box>
      </Dialog>



<Divider/>
 {/* {Department ? <DepartmentList deleteDepartment={deleteDepartmentInfo} DepartmentData={Department} update={UpdateDepartmentInfo} /> : null }
     */}

 

 {isError ? (<Box sx={{ display:'flex',justifyContent:'center',textAlign:'center',alignItems:"center",p:10}}>

 <Box>

 <ErrorOutlineOutlined sx={{fontSize:"58px" }} />
 <Typography >Data noy found!</Typography>
     </Box>

 </Box>): isLoading ? (<Box sx={{ display:'flex',justifyContent:'center',textAlign:'center',alignItems:"center",p:10}}>

 <Box>

 <CircularProgress sx={{fontSize:"58px" }} />
 <Typography >Loading...</Typography>
     </Box>

 </Box>) :  <DepartmentList DeleteDepartment={deleteDepartmentInfo} DepartmentData={Department?.data.Alldepartment} update={UpdateDepartmentInfo} />  }
 

   </Box>
   
                   
    </>
}


