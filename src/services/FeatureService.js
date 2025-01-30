import FeaturesModel from "../model/FeatureModel.js";
import LegalModel from "../model/LegalModel.js";

export const FeaturesListService = async () => {
    try {
        let data= await FeaturesModel.find();
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}



export const LegalDetailsService = async (req) => {
    try {
        let reqType = req.params.type
        let data= await LegalModel.find({type:reqType});
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}