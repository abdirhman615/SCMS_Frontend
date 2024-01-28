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
export const Complain = ()=>{
    const YupValidate = yup.object({
        Student_id: yup.string().required('Enter The Student Id'),
        department_id: yup.string().required("Enter The department"),
        Class_id: yup.string().required('Enter The Class'),
        Description: yup.string().required("Enter The Description"),
        Complain_date: yup.string().required('Enter The Complain Data'),
        Status: yup.string().required("Enter The Status"),
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
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }

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
  <Link underline="hover" color="inherit" href="#">
    Dashboard
  </Link>
  <Typography color="text.primary">Complain</Typography>
</Breadcrumbs>
 <Divider sx={{height:10}}/>
    <Alert severity="info">Our Complain</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={2}>
        <Typography variant="h6">List Complain</Typography>
        <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
    </Box>
    <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New Complain</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewComplain)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>



<TextField label="Complain name" {...register("Complainname")} variant="outlined" size="small" fullWidth/>

<TextField type="date" variant="outlined" {...register("Creationdate")} size="small" fullWidth/>
    
    
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
 

   </Box>
   
   <Card variant="outlined" sx={{ maxWidth: 300 }}>
      <Box sx={{ p: 2 }}>
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
                   
    </>
}

// import * as React from 'react';
// import Card from '@mui/material/Card';
// import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';

// export default function Complain() {
//   return (
//     <Card variant="outlined" sx={{ maxWidth: 360 }}>
//       <Box sx={{ p: 2 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Typography gutterBottom variant="h5" component="div">
//             Toothbrush
//           </Typography>
//           <Typography gutterBottom variant="h6" component="div">
//             $4.50
//           </Typography>
//         </Stack>
//         <Typography color="text.secondary" variant="body2">
//           Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
//           just down the hall.
//         </Typography>
//       </Box>
//       <Divider light />
//       <Box sx={{ p: 2 }}>
//         <Typography gutterBottom variant="body2">
//           Select type
//         </Typography>
//         <Stack direction="row" spacing={1}>
//           <Chip color="primary" label="Soft" size="small" />
//           <Chip label="Medium" size="small" />
//           <Chip label="Hard" size="small" />
//         </Stack>
//       </Box>
//     </Card>
//   );
// }
