import React from "react";
import { useNavigate } from "react-router-dom";



const Profile=()=>{
    const auther=localStorage.getItem("val")
    const name=JSON.parse(auther).name
    const email=JSON.parse(auther).email
    const navigate=useNavigate()
    const updateProfile=()=>{
        navigate("/edituser")

    }
    return(
        <div div className="user-profile">
            <h2>Welcome {JSON.parse(auther).name}</h2>
            <input type="text" value={name} placeholder="Your Name" className="inputbox"/>
            <input type="text" value={email} placeholder="Your Email" className="inputbox"/>
            <button onClick={updateProfile} className="userbtn">Update profile</button>

        </div>
    )
}
export default Profile;