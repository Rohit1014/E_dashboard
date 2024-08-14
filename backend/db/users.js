const mongoose=require("mongoose");
const dbschema=new mongoose.Schema({
name:String,
email:String,
password:String
}
)
module.exports=mongoose.model("users",dbschema)
