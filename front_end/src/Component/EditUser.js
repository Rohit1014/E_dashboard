import React,{useState} from "react";


const EditUser=()=>{
    const [name,setname]=React.useState("")
    const [email,setemail]=React.useState("")
    const [password,setpassword]=React.useState("")
    const [error,seterror]=React.useState(false)
    let auther=localStorage.getItem("val")
    let pd = JSON.parse(auther);
    const UpdateUser=async()=>{
        if(!name&&!email&&!password){
            seterror(true)
            return false
        }
        let result = await fetch(`http://localhost:5000/updateuser/${password}`, {
            method: "put",
            body: JSON.stringify({ name,email}),
            headers: { "Content-Type": "application/json",
                
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
    
                }
             }
            )
            result=await result.json()
        
            if(result.modifiedCount>0)
                pd.name=name
                pd.email=email
                let updatedUserData = JSON.stringify(pd);
                localStorage.setItem("val", updatedUserData)



                


        console.log(result)
        
}

        
    
    


    return(
        <div div className="user-profile">
        <h2>Edit here </h2>
        <input type="text"  placeholder="Your New Name" className="inputbox" value={name} onChange={(e)=>{setname(e.target.value)}} />
        {error &&!name && <span className="invalid-value">Enter  Name</span>}

        <input type="text"  placeholder="Your New Email" className="inputbox" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        {error &&!email && <span className="invalid-value">Enter  email</span>}

        <input type="text"  placeholder="Enter  Password" className="inputbox"value={password}  onChange={(e)=>{setpassword(e.target.value)}} />
        {error &&!password && <span className="invalid-value">Enter password</span>}

    
        <button onClick={UpdateUser} className="userbtn">Update</button>

    </div>
    )
}

export default EditUser
