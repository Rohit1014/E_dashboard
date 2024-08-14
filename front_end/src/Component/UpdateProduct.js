import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct=()=>{
    const [name,setpname]=React.useState("");
    const [price,setpprice]=React.useState("");
    const [category,setpcatg]=React.useState("");
    const [company,setpcom]=React.useState("");
    const params=useParams();
    const navigate=useNavigate();

    
    useEffect(()=>{
      getDetail();
    },[])
    const getDetail=async()=>{
        let result =await fetch(`http://localhost:5000/products/${params.id}`,
            {
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
    
                }
            });
        
        result=await result.json()
        setpname(result.name)
        setpprice(result.price)
        setpcatg(result.category)
        setpcom(result.company)
    }

    


    const Updateproduct=async()=>{
        console.log(name,price,category,company)
        let result = await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, price, category, company }),
            headers: { "Content-Type": "application/json",
            
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
    
                }
             }
            )
        
        result=await result.json()
        if(result){
            alert("record updated")
            navigate("/")

        }
        console.log(result)        
    }

    return(
        <div className="add-product">
            <h3>Update product</h3>
                <input type="text" placeholder="Enter product name"className="inputbox" value={name} onChange={(e)=>{setpname(e.target.value)}}/>
                {!name && <span className="invalid-value">Enter valid Name</span>}

                <input type="text" placeholder="Enter product price"className="inputbox"value={price}onChange={(e)=>{setpprice(e.target.value)}} />
                { !price && <span className="invalid-value" >Enter valid Price</span>}

                <input type="text" placeholder="Enter product category" className="inputbox"value={category} onChange={(e)=>{setpcatg(e.target.value)}} />
                { !category&& <span className="invalid-value" >Enter valid Category</span>}

                <input type="text" placeholder="Enter product company"className="inputbox"value={company} onChange={(e)=>{setpcom(e.target.value)} }/>
                { !company&& <span className="invalid-value" >Enter valid Company</span>}

            <button  onClick={Updateproduct}className="productbtn" type="submit">Update Product</button>
        </div>
    )
}
export default UpdateProduct