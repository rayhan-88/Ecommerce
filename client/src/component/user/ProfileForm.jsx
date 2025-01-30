import React, {useEffect} from 'react';
import UserStore from "../../store/UserStore.js";
import toast from "react-hot-toast";

const ProfileForm = () => {
    const {ProfileFormData,ProfileFormDataOnChange,ProfileCreateRequest,ProfileUpdateRequest,ProfileReadRequest} =UserStore()

    useEffect(() => {
        (async ()=>{
            await ProfileReadRequest()
        })()
    }, []);

    const Create =async () => {
      await ProfileCreateRequest(ProfileFormData);
      toast.success("Profile Created Successfully.");
        await ProfileReadRequest()
    }
    const Update =async () => {
      await ProfileUpdateRequest(ProfileFormData);
      toast.success("Profile Update Successfully.");
    }


    return (
        <div className="container mt-5">
            <div className="card p-5 rounded-3">
                <h6>Customer Details</h6>
                <hr/>
                <div className="row mb-4">
                    <div className="col-md-3 p-2">
                        <label className="form-label">Customer Name </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("cus_name",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Customer Phone </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("cus_phone",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Customer Fax </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("cus_fax",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Customer Country </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("cus_country",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Customer City </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("cus_city",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Customer State </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("cus_state",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Customer Post Code </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("cus_postcode",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Customer Address</label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("cus_add",e.target.value)}} type="text" className="form-control "/>
                    </div>
                </div>
                <h6>Shipping Details</h6>
                <hr/>
                <div className="row">
                    <div className="col-md-3 p-2">
                        <label className="form-label">Shipping Name </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("ship_name",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Shipping Phone </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("ship_phone",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Shipping Country </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("ship_country",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Shipping City </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("ship_city",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Shipping State </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("ship_state",e.target.value)}} type="text" className="form-control "/>
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Shipping Post Code </label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("ship_postcode",e.target.value)}} type="text" className="form-control " />
                    </div>
                    <div className="col-md-3 p-2">
                        <label className="form-label">Shipping Address</label>
                        <input onChange={(e)=>{ProfileFormDataOnChange("ship_add",e.target.value)}} type="text" className="form-control " />
                    </div>
                </div>
                <div className="row mt-4 ">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="col-md-3 p-2">
                            <button onClick={Create} className="btn btn-success">Create</button>
                        </div>
                        <div className="col-md-3 p-2 ">
                            <button onClick={Update} className="btn btn-success">Update</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileForm;