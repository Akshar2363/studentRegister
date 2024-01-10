import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) =>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const loginUser = async (inputs) => {
        const res = await axios.post("http://127.0.0.1:5000/api/auth/login", inputs, {withCredentials: true,});
        setUser(res.data.others)
    };
    const signUpUser = async (inputs) => {
        const res = await axios.post("http://127.0.0.1:5000/api/auth/signup", inputs);
        console.log(res.data);
        return res.data
    };
    const logoutUser = async () => {
        const res = await axios.post("http://127.0.0.1:5000/api/auth/logout", {withCredentials: true,});
        console.log(res)
        setUser(null)
        return res.data;
    };
    const getUser = async (inputs) => {
        const res = await axios.post("http://127.0.0.1:5000/api/auth/getUser", inputs, {withCredentials: true,});
        setUser(res.data.others)
    };
    
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(user))
    },[user])

    return(
        <AuthContext.Provider value={{user, loginUser, signUpUser, logoutUser, getUser}}>
            {children}
        </AuthContext.Provider>
    )
}