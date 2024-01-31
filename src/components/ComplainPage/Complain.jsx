import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import ComplainList from "./ComplainList";
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
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
export const Complain = ()=>{
    const YupValidate = yup.object({
        Student_id: yup.string().required('Enter The Student Id'),
        department_id: yup.string().required("Enter The department Name"),
        Class_id: yup.string().required('Enter The Class Name'),
        Description: yup.string().required("Enter The Description"),
        Complain_date: yup.string().required('Enter The Complain Data'),
        // Status: yup.string().required("Enter The Status"),
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
    const [Complaindeleteid,setComplaindeleteid]=useState('')
    const [ComplainId,setComplainId]=useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [apiData, setapiData] = useState("")  
    const[subcatClass,setsubcatClass]= useState([])
    const[subcatDep,setsubcatDep]= useState([])
    const[subcatSTD,setsubcatSTD]= useState([])
    const [Depval,setDepval]=useState('')
    const [Classval,setClassval]=useState('')
    const [STDval,setSTDval]=useState('')
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }


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
                 
    const STDlist=await axios.get('http://localhost:5000/Student/')
                const STDval=await STDlist.data.AllStudent
                setsubcatSTD(STDval)
                 console.log("STDval",STDval)
    
    
        }
        subget()
    
    }, [])

const {data:Complain,isLoading,isError}= GetQuery('/Complain','Complain')

const {mutate,isLoading:mutateLoading} = PostQuery('/Complain','Complain')

const {mutate:updateMutate,isLoading:updateLoading} = UpdateQuery(`/Complain/${ComplainId}`,'Complain')
 
const {mutate:deleteMutate} = DeleteQuery(`/Complain/${Complaindeleteid}`,'Complain')


const AddNewComplain = async (data)=>{

    if(ComplainId !==''){

 try{
//   await UpdateClient(ComplainId,subdata)
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

const UpdateComplainInfo = async (data)=>{
// console.log("xogta la rabbo in la update gareeyo",data)
    setValue("Complainname",data.Complainname)
    setValue("Creationdate",data.Creationdate)
    setComplainId(data._id)
    ToggleDailog()

}


const deletehook = useDeleteHook()

const deleteCheck = ()=>{
    deleteMutate(Complaindeleteid)
    deletehook.Toggle()
   
}

const deleteComplainInfo = async (data)=>{
   deletehook.setMessage(data.Complainname)
    deletehook.Toggle()
    setComplaindeleteid(data._id)
}


    return <>
   <Box p={4}>

   <ConfirmDelete open={deletehook.open} toggle={deletehook.Toggle} message={deletehook.message} confirm={deleteCheck} />
 <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" to={'Dashboard'}>
    Dashboard
  </Link>
  <Typography color="text.primary">Complain</Typography>
</Breadcrumbs>

 <Divider sx={{height:10}}/>
    <Alert severity="info">Our Complain</Alert>
    {/* <Box sx={{display:"flex",justifyContent:"space-between"}} my={2}>
        <Typography variant="h6">List Complain</Typography>
        <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
    </Box> */}
    <Dialog sx={{
        backdropFilter: "blur(5px) sepia(5%)",
      }} PaperProps={{ sx: { borderRadius: "20px" } }} open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }}>New Complain</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewComplain)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>

<FormControl >
<InputLabel id="demo-multiple-name-label">Student Name</InputLabel>
  <Select label="Student id" variant="outlined" {...register("Student_id")} size="small" fullWidth>
    
  {subcatSTD.map((STDval) => (
    <MenuItem key={STDval._id} value={STDval._id}>
      {STDval.Stdname}
    </MenuItem>
  ))}
</Select>
{errors.Student_id ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Student_id.message}
                  </Typography>
                ) : null}
</FormControl>

<FormControl >
<InputLabel id="demo-multiple-name-label">Departments</InputLabel>
  <Select label="Department id" variant="outlined" {...register("department_id")} size="small" fullWidth>
    
  {subcatDep.map((Depval) => (
    <MenuItem key={Depval._id} value={Depval._id}>
      {Depval.departmentname}
    </MenuItem>
  ))}
</Select>
{errors.department_id ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.department_id.message}
                  </Typography>
                ) : null}
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
{errors.Class_id ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Class_id.message}
                  </Typography>
                ) : null}
</FormControl>


{/* <TextField label="Description" {...register("Description")} variant="outlined" size="small" fullWidth/> */}

<TextField label="Description" multiline maxRows={4} variant="outlined" {...register("Description")}  size="small" fullWidth/>
{errors.Description ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Description.message}
                  </Typography>
                ) : null}
<TextField type="date" variant="outlined" {...register("Complain_date")} size="small" fullWidth/>
{errors.Complain_date ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Complain_date.message}
                  </Typography>
                ) : null}
{/* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
        <Select label="Department id" variant="outlined" {...register("Status")} size="small" fullWidth
        >
          <MenuItem value="">
            <em>Status</em>
          </MenuItem>
          <MenuItem value={"New"}>New</MenuItem>
          <MenuItem value={"Open"}>Open</MenuItem>
          
        </Select>
      </FormControl> */}
    </Stack>

    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ToggleDailog}>Cancel</Button>
          <Button variant="contained" disabled={mutateLoading} sx={{bgcolor:"primary"}} type="submit"  size="small">

      {ComplainId !=='' ? "Update" : "Submit"}
          </Button>
 
        </DialogActions>

        </Box>
      </Dialog>



<Divider/>
 {/* {Complain ? <ComplainList deleteComplain={deleteComplainInfo} ComplainData={Complain} update={UpdateComplainInfo} /> : null }
     */}

 
{/* 
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

 </Box>) :  <ComplainList DeleteComplain={deleteComplainInfo} ComplainData={Complain?.data.AllComplain} update={UpdateComplainInfo} />  }
  */}

   
   <Box sx={{ display:'flex',justifyContent:'space-around'}}   my={3}>
   <Card  variant="outlined" sx={{ maxWidth: 300 }}>
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
          Submit Complaint
          </Typography>
          
        </Stack>
        
      </Box>
      <Divider light />
      <Box sx={{display:"flex",justifyContent:"space-between",p: 1}} my={2} >
      
        <Typography gutterBottom variant="body2">
          Add Complain
        </Typography>
        <Stack direction="row" spacing={2}>
          <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
        </Stack>
      </Box>
    </Card>
   <Card variant="outlined" sx={{ maxWidth: 300 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
          View Complaint
          </Typography>
          
        </Stack>
        
      </Box>
      <Divider light />
      <Box sx={{display:"flex",justifyContent:"space-between",p: 1}} my={2} >
      
        <Typography gutterBottom variant="body2">
          Add Complain
        </Typography>
        <Stack direction="row" spacing={2}>
          <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
        </Stack>
      </Box>
    </Card>
     </Box> 
     </Box>       
    </>
}