import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import ClassList from "./ClassList";
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

export const Class = ()=>{
    const YupValidate = yup.object({
        Class_ID: yup.string().required('Enter The Class ID'),
        Classname: yup.string().required('Enter The Class Name'),
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
    const [Classdeleteid,setClassdeleteid]=useState('')
    const [ClassId,setClassId]=useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [apiData, setapiData] = useState("")      
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }

// const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()

   
// useEffect(()=>{
//     const subget= async()=>{
//         const sublist=await getAllClient()
//         const subdata=await sublist.data.AllOutClient
//         setClass(subdata)
//      console.log("subdata",subdata)

   
//     }
//     subget()


// },[])

const {data:Class,isLoading,isError}= GetQuery('/Class','Class')

const {mutate,isLoading:mutateLoading} = PostQuery('/Class','Class')

const {mutate:updateMutate,isLoading:updateLoading} = UpdateQuery(`/Class/${ClassId}`,'Class')
 
const {mutate:deleteMutate} = DeleteQuery(`/Class/${Classdeleteid}`,'Class')


const AddNewClass = async (data)=>{

    if(ClassId !==''){

 try{
//   await UpdateClient(ClassId,subdata)
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
           toast.success("Data has been saved")
        mutate(data)
          ToggleDailog()
          reset()
              } catch( err){
          console.log("error jiro ",err)
          toast.error(err.message)
              }

    }
    

   
}

const UpdateClassInfo = async (data)=>{
// console.log("xogta la rabbo in la update gareeyo",data)
    setValue("Class_ID",data.Class_ID)
    setValue("Classname",data.Classname)
    setClassId(data._id)
    ToggleDailog()

}


// const deleteClassInfo = async (subdata)=>{
//     setshowAlert(true)       
// }


const deletehook = useDeleteHook()

const deleteCheck = ()=>{
    deleteMutate(Classdeleteid)
    deletehook.Toggle()
   
}

const deleteClassInfo = async (data)=>{
   deletehook.setMessage(data.Classname)
    deletehook.Toggle()
    setClassdeleteid(data._id)
}


    return <>
   <Box p={4}>

   <ConfirmDelete open={deletehook.open} toggle={deletehook.Toggle} message={deletehook.message} confirm={deleteCheck} />
 <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="#">
    Dashboard
  </Link>
  <Typography color="text.primary">Class</Typography>
</Breadcrumbs>
 <Divider sx={{height:10}}/>
    <Alert severity="info">Our Class</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={2}>
        <Typography variant="h6">List Class</Typography>
        <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
    </Box>
    <Dialog sx={{
        backdropFilter: "blur(5px) sepia(5%)",
      }} PaperProps={{ sx: { borderRadius: "20px" } }} open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }}>New Class</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewClass)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>


    
<TextField label="Class ID" {...register("Class_ID")} variant="outlined" size="small" fullWidth/>
{errors.Class_ID ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Class_ID.message}
                  </Typography>
                ) : null}
<TextField label="Class name" {...register("Classname")} variant="outlined" size="small" fullWidth/>
{errors.Classname ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Classname.message}
                  </Typography>
                ) : null}

    
    
    </Stack>

    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ToggleDailog}>Cancel</Button>
          <Button variant="contained" disabled={mutateLoading} sx={{bgcolor:"primary"}} type="submit"  size="small">

      {ClassId !=='' ? "Update" : "Submit"}
          </Button>
 
        </DialogActions>

        </Box>
      </Dialog>



<Divider/>
 {/* {Class ? <ClassList deleteClass={deleteClassInfo} ClassData={Class} update={UpdateClassInfo} /> : null }
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

 </Box>) :  <ClassList DeleteClass={deleteClassInfo} ClassData={Class?.data.AllClass} update={UpdateClassInfo} />  }
 

   </Box>
   
                   
    </>
}


