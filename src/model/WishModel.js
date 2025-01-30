import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true }
},
    {versionKey: false, timestamps: true});

const WishModel = mongoose.model('wishes', DataSchema)
export default WishModel



















