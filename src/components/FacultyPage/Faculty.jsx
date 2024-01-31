import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import FacultyList from "./FacultyList";
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

export const Faculty = ()=>{
    const YupValidate = yup.object({
        Facultyname: yup.string().required('Enter The Faculty Name'),
        Creationdate: yup.string().required("Enter The Creation date"),
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
    const [Facultydeleteid,setFacultydeleteid]=useState('')
    const [FacultyId,setFacultyId]=useState('')
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
//         setFaculty(subdata)
//      console.log("subdata",subdata)

   
//     }
//     subget()


// },[])

const {data:Faculty,isLoading,isError}= GetQuery('/Faculty','Faculty')

const {mutate,isLoading:mutateLoading} = PostQuery('/Faculty','Faculty')

const {mutate:updateMutate,isLoading:updateLoading} = UpdateQuery(`/Faculty/${FacultyId}`,'Faculty')
 
const {mutate:deleteMutate} = DeleteQuery(`/Faculty/${Facultydeleteid}`,'Faculty')


const AddNewFaculty = async (data)=>{

    if(FacultyId !==''){

 try{
//   await UpdateClient(FacultyId,subdata)
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

const UpdateFacultyInfo = async (data)=>{
// console.log("xogta la rabbo in la update gareeyo",data)
    setValue("Facultyname",data.Facultyname)
    setValue("Creationdate",data.Creationdate)
    setFacultyId(data._id)
    ToggleDailog()

}


// const deleteFacultyInfo = async (subdata)=>{
//     setshowAlert(true)       
// }


const deletehook = useDeleteHook()

const deleteCheck = ()=>{
    deleteMutate(Facultydeleteid)
    deletehook.Toggle()
   
}

const deleteFacultyInfo = async (data)=>{
   deletehook.setMessage(data.Facultyname)
    deletehook.Toggle()
    setFacultydeleteid(data._id)
}


    return <>
   <Box p={4}>

   <ConfirmDelete open={deletehook.open} toggle={deletehook.Toggle} message={deletehook.message} confirm={deleteCheck} />
 <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="#">
    Dashboard
  </Link>
  <Typography color="text.primary">Faculty</Typography>
</Breadcrumbs>
 <Divider sx={{height:10}}/>
    <Alert severity="info">Our Faculty</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={2}>
        <Typography variant="h6">List Faculty</Typography>
        <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
    </Box>
    <Dialog sx={{
        backdropFilter: "blur(5px) sepia(5%)",
      }} PaperProps={{ sx: { borderRadius: "20px" } }} open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }}>New Faculty</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewFaculty)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>



<TextField label="Faculty name" {...register("Facultyname")} variant="outlined" size="small" fullWidth/>
{errors.Facultyname ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Facultyname.message}
                  </Typography>
                ) : null}

<TextField type="date" variant="outlined" {...register("Creationdate")} size="small" fullWidth/>
    {errors.Creationdate ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Creationdate.message}
                  </Typography>
                ) : null}
    
    </Stack>

    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ToggleDailog}>Cancel</Button>
          <Button variant="contained" disabled={mutateLoading} sx={{bgcolor:"primary"}} type="submit"  size="small">

      {FacultyId !=='' ? "Update" : "Submit"}
          </Button>
 
        </DialogActions>

        </Box>
      </Dialog>



<Divider/>
 {/* {Faculty ? <FacultyList deleteFaculty={deleteFacultyInfo} FacultyData={Faculty} update={UpdateFacultyInfo} /> : null }
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

 </Box>) :  <FacultyList DeleteFaculty={deleteFacultyInfo} FacultyData={Faculty?.data.AllFaculty} update={UpdateFacultyInfo} />  }
 

   </Box>
   
                   
    </>
}


