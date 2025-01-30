import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    email:{type:String,required: true,unique:true,lowercase:true},
    otp:{type:String,required: true}
},
    {versionKey:false,timestamps:true}
);
const UserModel = mongoose.model('users',DataSchema);
export default UserModel;