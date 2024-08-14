import {React,useState,useEffect} from "react";
import { useNavigate} from "react-router-dom"


const Signup=()=>{
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
       const auther=localStorage.getItem("val")
       if(auther){
        navigate("/")
       }
   },[])

    const CollectData=async()=>{
        let result= await fetch("http://localhost:5000/register",{
            method:"post",
            body:JSON.stringify({name,email,password}),
            headers:{"Content-Type":"application/json",
                
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
    
                }
            }

        )
        result=await result.json();
        localStorage.setItem("val",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))
        if(result){
            navigate("/")
        }
        
    }
    return(
        <div className="register">
            <h1 className="head">Register Here</h1>
            <input className="inputbox" type="text" placeholder="Enter name" value={name} onChange={(e)=>setname(e.target.value)} />
            <input className="inputbox" type="email" placeholder="Enter email" value={email} onChange={(e)=>setemail(e.target.value)}/>
            <input className="inputbox" type="password" placeholder="Enter password"value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <button onClick={CollectData} className="signinbutton" type="button" >signup</button>

        </div>
    );
}
export default Signup;