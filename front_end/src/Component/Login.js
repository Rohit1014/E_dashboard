import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate();
    useEffect(()=>{
   const auther=localStorage.getItem("user")
   if(auther){
    navigate("/")
   }
    },[])

        const  LoginBtn=async()=>{
            let ans= await fetch("http://localhost:5000/login",{
                method:"post",
                body:JSON.stringify({email,password}),
                headers:{"Content-Type":"application/json"}
    
            })
        
                ans=await ans.json()
                
                if(ans.auth){
                    localStorage.setItem("val",JSON.stringify(ans.user))
                    localStorage.setItem("token",JSON.stringify(ans.auth))

                    navigate("/")
                }
                else{
                    alert("Please enter correct details")
                }
        
        
    }

    return(
        <div className="login"> 
             <h1 className="head">Login</h1>
            <input className="inputbox" type="text" placeholder="Enter email" value={email} onChange={(e)=>setemail(e.target.value)}/>
            <input className="inputbox" type="password" placeholder="Enter password"value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <button type="submit"className="loginbutton"  onClick={LoginBtn}>Login</button>

        </div>
    )
}
export default Login