import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import StudentList from "./StudentsList";
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
import ConfirmDelete from "../../../CustomHooks/deleteComponent/ConfirmDelete";
import {  useDeleteHook } from "../../../CustomHooks/deleteComponent/deleteHooks";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {GetQuery,PostQuery,UpdateQuery,DeleteQuery} from '../../../Shared/ReactQuery'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const Student = ()=>{
    const YupValidate = yup.object({
        Stdname: yup.string().required('Enter The Student Name'),
        phone: yup.string().required("Enter Phone Number"),
        Address: yup.string().required('Enter The Address'),
        Gender: yup.string().required("Enter The Gender"),
        Email: yup.string().required('Enter The Email'),
        STD_Pass: yup.string().required("Enter The Std Pass"),
        department_id: yup.string().required('Enter The Department ID'),
        Class_id: yup.string().required("Enter The Client Class ID"),
        
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
    const [Studentdeleteid,setStudentdeleteid]=useState('')
    const [StudentId,setStudentId]=useState('')
    const[subcatClass,setsubcatClass]= useState([])
    const[subcatDep,setsubcatDep]= useState([])
    const [Depval,setDepval]=useState('')
    const [Classval,setClassval]=useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [apiData, setapiData] = useState("")      
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }

// const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()

   

useEffect(() =>{
    const subget= async()=>{
        const deplist=await axios.get('http://localhost:5000/department')
        
        const Depval=await deplist.data.Alldepartment
        
        setsubcatDep(Depval)
console.log(Depval)


const Classlist=await axios.get('http://localhost:5000/Class')
            const Classval=await Classlist.data.AllClass
            setsubcatClass(Classval)
             console.log("Classval",Classval)


    }
    subget()

}, [])

const {data:Student,isLoading,isError}= GetQuery('/Student','Student')

const {mutate,isLoading:mutateLoading} = PostQuery('/Student','Student')

const {mutate:updateMutate,isLoading:updateLoading} = UpdateQuery(`/Student/${StudentId}`,'Student')
 
const {mutate:deleteMutate} = DeleteQuery(`/Student/${Studentdeleteid}`,'Student')


const AddNewStudent = async (data)=>{

    if(StudentId !==''){

 try{
//   await UpdateClient(StudentId,subdata)
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

const UpdateStudentInfo = async (data)=>{
// console.log("xogta la rabbo in la update gareeyo",data)
    setValue("Stdname",data.Stdname)
    setValue("phone",data.phone)
    setValue("Address",data.Address)
    setValue("Gender",data.Gender)
    setValue("STD_Pass",data.STD_Pass)
    setValue("Email",data.Email)
    setValue("department_id",data.department_id)
    setValue("Class_id",data.Class_id)
    setStudentId(data._id)
    ToggleDailog()

}


// const deleteStudentInfo = async (subdata)=>{
//     setshowAlert(true)       
// }


const deletehook = useDeleteHook()

const deleteCheck = ()=>{
    deleteMutate(Studentdeleteid)
    deletehook.Toggle()
   
}

const deleteStudentInfo = async (data)=>{
   deletehook.setMessage(data.Studentname)
    deletehook.Toggle()
    setStudentdeleteid(data._id)
}


    return <>
   <Box p={4}>

   <ConfirmDelete open={deletehook.open} toggle={deletehook.Toggle} message={deletehook.message} confirm={deleteCheck} />
 <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="#">
    Dashboard
  </Link>
  <Typography color="text.primary">Student</Typography>
</Breadcrumbs>
 <Divider sx={{height:10}}/>
    <Alert severity="info">Our Student</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={2}>
        <Typography variant="h6">List Student</Typography>
        <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
    </Box>
    <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New Student</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewStudent)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>



<TextField label="Student name" {...register("Stdname")} variant="outlined" size="small" fullWidth/>

<TextField label="phone" variant="outlined" {...register("phone")} size="small" fullWidth/>

<TextField label="Address" {...register("Address")} variant="outlined" size="small" fullWidth/>
{/* 
<TextField label="Gender" variant="outlined" {...register("Gender")} size="small" fullWidth/> */}


<FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
        <Select label="Department id" variant="outlined" {...register("Gender")} size="small" fullWidth
        >
          <MenuItem value="">
            <em>Gender</em>
          </MenuItem>
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          
        </Select>
      </FormControl>

<TextField label="Email" {...register("Email")} variant="outlined" size="small" fullWidth/>

<TextField label="STD_Pass" variant="outlined" {...register("STD_Pass")} size="small" fullWidth/>
{/* 
<TextField label="department_id" {...register("department_id")} variant="outlined" size="small" fullWidth/> */}

<FormControl >
<InputLabel id="demo-multiple-name-label">Department Name</InputLabel>
  <Select label="Department id" variant="outlined" {...register("department_id")} size="small" fullWidth>
    
  {subcatDep.map((Depval) => (
    <MenuItem key={Depval._id} value={Depval._id}>
      {Depval.departmentname}
    </MenuItem>
  ))}
</Select>
</FormControl>

<FormControl >
<InputLabel id="demo-multiple-name-label">Class Name</InputLabel>
  <Select label="Class id" variant="outlined" {...register("Class_id")} size="small" fullWidth>
    
  {subcatClass.map((Classval) => (
    <MenuItem key={Classval._id} value={Classval._id}>
      {Classval.Classname}
    </MenuItem>
  ))}
</Select>
</FormControl>

{/* 
<TextField label="Class_id" variant="outlined" {...register("Class_id")} size="small" fullWidth/>
     */}
    
    </Stack>

    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ToggleDailog}>Cancel</Button>
          <Button variant="contained" disabled={mutateLoading} sx={{bgcolor:"primary"}} type="submit"  size="small">

      {StudentId !=='' ? "Update" : "Submit"}
          </Button>
 
        </DialogActions>

        </Box>
      </Dialog>



<Divider/>
 {/* {Student ? <StudentList deleteStudent={deleteStudentInfo} StudentData={Student} update={UpdateStudentInfo} /> : null }
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

 </Box>) :  <StudentList DeleteStudent={deleteStudentInfo} StudentData={Student?.data.AllStudent} update={UpdateStudentInfo} />  }
 

   </Box>
   
                   
    </>
}


