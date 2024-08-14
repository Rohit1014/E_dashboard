import React from "react";
import { useNavigate } from "react-router-dom";

const AddProduct=()=>{
    const [name,setpname]=React.useState("");
    const [price,setpprice]=React.useState("");
    const [category,setpcatg]=React.useState("");
    const [company,setpcom]=React.useState("");
    
    const [error,seterror]=React.useState(false)
    const navigate=useNavigate()


    const SubmitProduct=async()=>{

        if(!name||!price||!category||!company){
            seterror(true)
            return false

        }
        let userId=localStorage.getItem("val");
        userId=JSON.parse(userId)._id;
          let result = await fetch("http://localhost:5000/aproduct", {
            method: "POST",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: { "Content-Type": "application/json",
                
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
    
                }
             }
            )
        

        result = await result.json();
        if(result){
            navigate("/")
        }
    };
         
      
        

            
    

    return(
        <div className="add-product">
            <h3>Add product</h3>
                <input type="text" placeholder="Enter product name" className="inputbox" value={name} onChange={(e)=>{setpname(e.target.value)}}/>
                {error &&!name && <span className="invalid-value">Enter valid Name</span>}

                <input type="text" placeholder="Enter product price"className="inputbox"value={price}onChange={(e)=>{setpprice(e.target.value)}} />
                {error &&!price && <span className="invalid-value" >Enter valid Price</span>}

                <input type="text" placeholder="Enter product category" className="inputbox"value={category} onChange={(e)=>{setpcatg(e.target.value)}} />
                {error && !category&& <span className="invalid-value" >Enter valid Category</span>}

                <input type="text" placeholder="Enter product company"className="inputbox"value={company} onChange={(e)=>{setpcom(e.target.value)} }/>
                {error && !company&& <span className="invalid-value" >Enter valid Company</span>}

            <button  onClick={SubmitProduct}className="productbtn" type="submit">Add Product</button>
        </div>
    )
}
export default AddProduct