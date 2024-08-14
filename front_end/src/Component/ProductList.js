import React,{useEffect} from "react";
import {Link} from "react-router-dom";


const ProductList=()=>{
    const [product,setproducts]=React.useState([])
    useEffect(()=>{
        getProduct()
    },[])
    const getProduct=async()=>{
        let result = await fetch("http://localhost:5000/product",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`

            }
        })
            result=await result.json()
            setproducts(result)
    }
     const delitem=async(id)=>{
        let result = await fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`

            }
            
        });
        result=await result.json()
        if(result){
            alert("record is deleted")
            getProduct()
        }
     }
     const searchVal=async(event)=>{
      let key=event.target.value
      if(key){
      let result=await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`

        }
      })
      result=await result.json()
      if(result){
        setproducts(result)
      }
     }else{
        getProduct()
     }
    }
    return(
        <div className="product-list">
            <h2>Product List</h2>
            <input className="Search-box" type="text" placeholder="Search Product" onChange={searchVal}/>
            
            <ul>
                <li>S no</li>
                <li>Name</li>
                <li>Price</li>
                <li>category</li>
                <li>Operation</li>
                </ul>
                {
                   product.length>0? product.map((item,index)=>
                <ul key={item}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category }</li>
                <li><button onClick={()=>{delitem(item._id)}} type="">Delete</button>
                <Link to={`/update/${item._id}`}>Update</Link></li>
                </ul>
                    )
                :<h1> No Product Found</h1>
                }
            
            </div>
    )
}
export default ProductList