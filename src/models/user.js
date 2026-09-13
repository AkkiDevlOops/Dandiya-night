import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    enrollmentNo:{
        type:String,
        required: true,
        unique:true,
    },
    name: {
        type: String,
        require:true,
    },
    program:{
        type:String,
        required: true,
    },
    programCode:{
        type: String,
        required:true,
    },
    year:{ 
        type: Number,
    },
    semester:{
        type: Number,
    },
    password:{
        type:String,
       
    },
    createdAt:{
        type: Date, default: Date.now, 
    }
})


const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;