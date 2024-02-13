import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { Box, Stack, IconButton, Typography, Alert,  Button, Divider, Breadcrumbs, Link } from "@mui/material"
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import jscookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../ContextApi/UserContext';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/SIU.UNIVERSITY?__tn__=-UC*F">
         Somali International University
      </Link>{'   '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


  export const Login = ()=>{
    const YupValidate = yup.object({
        username: yup.string().required('Please enter your username address'),
        Password: yup.string().required("Please enter your Password"),
    
      });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({ resolver: yupResolver(YupValidate) })


//   const handleLogin = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       username: data.get('username'),
//       Password: data.get('Password'),
//     });
//   };
const baseURL =import.meta.env.VITE_APP_API_URL

const usenav = useNavigate()
const {setIsLogin}= useUserContext();
const {mutateAsync,isLoading,isError,error,data:response}= useMutation({
    mutationFn: async (data) => {
       // return await axios.post ('http://localhost:5000/login',data)
       // return await axios.post ('https://backend-scms.vercel.app/login',data)
         return await axios.post (`${baseURL}/login`,data)

    },
    onError:(err)=>{
        console.log('Error',err)
    }
})


  const handleLogin = (data) => {
   
    // console.log("xogta",data);
    mutateAsync(data).then((res) => {
        // console.log("Login  Accepted",res.data.AccessToken);
        jscookie.set('token',res.data.token);
        if(res.status === 200){
            setIsLogin(true);
            usenav('/Dashboard')
        }
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
        
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/241148153_3023640017877655_2631154111194062654_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=783fdb&_nc_ohc=tKuVrtb3dhIAX9Bh_OO&_nc_ht=scontent-jnb1-1.xx&cb_e2o_trans=q&oh=00_AfDiadpamxnD7WdICNWVeQ_49jnA-uYCAmop4BP7k_z-oQ&oe=65D056B0)',
           // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Avatar alt="Remy Sharp"  sx={{  width: 100, height:100 }} src="../../logo/logo.png" />
            
            <Typography component="h2" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(handleLogin)} sx={{ mt: 1 }}>
        
                {isError && <Alert severity="error">Incorrect username or Password</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username "
                name="username"
                autoComplete="username"
                autoFocus 
                {...register("username")}
              />
               {errors.username ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.username.message}
                  </Typography>
                ) : null}
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="Password"
                id="Password"
                autoComplete="current-Password"
                {...register("Password")}
              />
               {errors.Password ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Password.message}
                  </Typography>
                ) : null}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 8 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


// import { Alert, Box, Button, Stack, TextField } from '@mui/material'
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import axios from 'axios';
// import React from 'react'
// import { useMutation } from '@tanstack/react-query';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// // import usernameIcon from '@mui/icons-material/username';
// import jscookie from 'js-cookie'
// // import { useNavigate } from "react-router-dom";
// import { useUserContext } from '../ContextApi/UserContext';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const usenavigate = useNavigate();

//     const LoginValidate = yup.object({
//         username: yup.string().required('Please enter your username address'),
//         Password: yup.string().required("Please enter your Password"),
    
//       });
//     // const usenavigate = useNavigate();
     

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         reset,
//         formState: { errors },
//       } = useForm({
//         resolver: yupResolver(LoginValidate)
//       });

//       const usenav = useNavigate()
//       const {setIsLogin}= useUserContext();
//       const {mutateAsync,isLoading,isError,error,data:response}= useMutation({
//           mutationFn: async (data) => {
//               return await axios.post ('http://localhost:5000/login',data)
//               // return await axios.post ('https://betahousebackendapi.vercel.app/login',data)
      
//           },
//           onError:(err)=>{
//               console.log('Error',err)
//           }
//       })
      
      
//         const handleLogin = (data) => {
         
//           // console.log("xogta",data);
//           mutateAsync(data).then((res) => {
//               // console.log("Login  Accepted",res.data.AccessToken);
//               jscookie.set('token',res.data.token);
//               if(res.status === 200){
//                   setIsLogin(true);
//                   usenav('/Dashboard')
//               }
//           })
//         };
//     // const {mutateAsync,isError,isLoading,error,data:response} = useMutation({
//     //     mutationFn: async (data) => {
//     //         return await axios.post('http://localhost:5000/login',data)
//     //     },
//     //     onError: async (err) => {
//     //         console.log(err.message)
//     //     }

//     // });

//     // const Login =async (data) => {
//     //     mutateAsync(data).then((res) => {
//     //         setIsLogin(true)
//     //         console.log(data)
//     //         jscookie.set('token',res.data)
            
//     //         usenavigate('/dashboard')
            
            
//     //     });
//     // }
//   return (
//     <>
//     <Box >

//         <Box component='form' onSubmit={handleSubmit(handleLogin)} sx={{width:'250px',backgroundColor:"#eee",p:6,mx:'auto', mt:10,height:'300px',borderRadius:5}}>

//             <Stack direction={'column'} spacing={2} sx={{mt:10}}>
//                {isError && <Alert severity='error'>Incorrect username or Password</Alert>}
//                 <Stack direction={'row'}>
//                 {/* <usernameIcon sx={{fontSize:40, color:'primary.main'}}/> */}
//                 <TextField {...register('username')} size='small' label='username' variant='outlined'></TextField>
//                 </Stack>
//                 <p>
//              {errors.username && (
//                <span style={{color:"#FA3F08"}}>{errors.username.message}</span>

//                )}

//             </p>
//                 <Stack direction={'row'}>
//                 {/* <LockOpenIcon sx={{fontSize:40, color:'primary.main'}}/> */}
//                 <TextField type='Password' {...register('Password')} size='small' label='Password' variant='outlined'></TextField>

//                 </Stack>
//                 <p>
//              {errors.Password && (
//                <span style={{color:"#FA3F08"}}>{errors.Password.message}</span>

//                )}

//             </p>
//                 <Button type='submit'variant='contained' size='small' sx={{color:'white'}}>Login</Button>
//             </Stack>
//         </Box>
        
//     </Box>
    
    
//     </>
//   )
// }






// // Import necessary dependencies
// import React, { useState } from 'react';
// import { Container  } from '@mui/material';
// // import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Paper from '@mui/material/Paper';
// import { Box, Stack, IconButton, Typography, Alert,  Button, Divider, Breadcrumbs, Link } from "@mui/material"
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// import jscookie from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import { useUserContext } from '../ContextApi/UserContext';

// // Functional component for the login page
// const Login = () => {

//     const YupValidate = yup.object({
//         username: yup.string().required('Please enter your username address'),
//         Password: yup.string().required("Please enter your Password"),
    
//       });

//     const {
//         register,
//         handleSubmit,
//         reset,
//         setValue,
//         formState: { errors },
//       } = useForm({ resolver: yupResolver(YupValidate) })


// //   const handleLogin = (event) => {
// //     event.preventDefault();
// //     const data = new FormData(event.currentTarget);
// //     console.log({
// //       username: data.get('username'),
// //       Password: data.get('Password'),
// //     });
// //   };

// const usenav = useNavigate()
// const {setIsLogin}= useUserContext();
// const {mutateAsync,isLoading,isError,error,data:response}= useMutation({
//     mutationFn: async (data) => {
//         return await axios.post ('http://localhost:5000/login',data)
//         // return await axios.post ('https://betahousebackendapi.vercel.app/login',data)

//     },
//     onError:(err)=>{
//         console.log('Error',err)
//     }
// })


//   const handleLogin = (data) => {
   
//     // console.log("xogta",data);
//     mutateAsync(data).then((res) => {
//         // console.log("Login  Accepted",res.data.AccessToken);
//         jscookie.set('token',res.data.token);
//         if(res.status === 200){
//             setIsLogin(true);
//             usenav('/Dashboard')
//         }
//     })
//   }

//   // State for storing username and password

//   // const [username, setUsername] = useState('');
//   // const [password, setPassword] = useState('');

//   // Event handler for form submission
//   // const handleLogin = (e) => {
//   //   e.preventDefault();
//   //   // Perform authentication logic here (e.g., send credentials to a server)
//   //   console.log('Username:', username);
//   //   console.log('Password:', password);
//   //   // You can add your authentication logic here
//   // };

//   return (
//     <Container component="main" maxWidth="xs">
//       <div>
//         <Typography variant="h5">Login</Typography>
//         <form onSubmit={handleLogin}>
//           {/* Username input */}
//           {/* <TextField
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           /> */}

// <TextField
//                  margin="normal"
//                  required
//                  fullWidth
//                  id="username"
//                  label="username Address"
//                  name="username"
//                  autoComplete="username"
//                  autoFocus 
//                  {...register("username")}
//                />
//           {/* Password input */}
//           {/* <TextField
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           /> */}
//           <TextField
//                  margin="normal"
//                  required
//                  fullWidth
//                  name="Password"
//                  label="Password"
//                  type="Password"
//                  id="Password"
//                  autoComplete="current-Password"
//                  {...register("Password")}
//                />
//           {/* Login button */}
//           <Button
//                  type="submit"
//                  fullWidth
//                  variant="contained"
//                  sx={{ mt: 3, mb: 2 }}
//                  disabled={isLoading}
//                >
//                  Login
//                </Button>
//           {/* <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//           >
//             Login
//           </Button> */}
//         </form>
//       </div>
//     </Container>
//   );
// };

// export default Login;
