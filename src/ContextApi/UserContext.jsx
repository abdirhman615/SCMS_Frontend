import { createContext, useEffect, useState } from "react";
import { useContext } from 'react';
import jscookie from "js-cookie";
const UserContextApi = createContext()
// const jwtdecode = from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const UserContextProvider = ({ children }) => {

    const usenavigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate();


    const LogOut = () => {

        console.log('Log Out');
        jscookie.remove('token')
        setIsLogin(false);
        usenavigate("/")
    }

    useEffect(() => {
        const token = jscookie.get('token')

        if (!token) {
            usenavigate("/")
        } else {
            // console.log(jwtDecode(token))
            const jwtdecoded = jwtDecode(token)
            setEmail(jwtdecoded.username);
            setIsLogin(true);
        }
    }, [])
    // useEffect(() => {
    //     const token = jscookie.get('token');
    
    //     const handleToken = () => {
    //         try {
    //             if (!token) {
    //                 navigate("/");
    //             } else {
    //                 const jwtdecoded = jwtDecode(token);
    //                 setEmail(jwtdecoded.email);
    //                 setIsLogin(true);
    //             }
    //         } catch (error) {
    //             // Handle the error (e.g., log it or redirect to an error page)
    //             console.error("Error decoding JWT token:", error);
    //             navigate("/");
    //         }
    //     };
    
    //     handleToken();
    // }, []);
    

    return (
        <UserContextApi.Provider value={{ email, LogOut, isLogin, setIsLogin }}>
            {children}
        </UserContextApi.Provider>
    )




}

export const useUserContext =()=>{
    return useContext(UserContextApi)
}

