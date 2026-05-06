const mongoose=require("mongoose")

//Define a schema
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        unique:[true,"Username already taken"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Account already exists with this email address"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//Create a model
const userModel=mongoose.model("users", userSchema);
module.exports=userModel