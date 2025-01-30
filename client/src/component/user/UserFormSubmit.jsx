import React from 'react';
import UserStore from "../../store/UserStore.js";

const UserFormSubmit = (props) => {
    const {isFormSubmit} = UserStore()
    if(isFormSubmit === false){
        return <button onClick={props.onClick} className={props.className} type='submit'>{props.text}</button>
    }else {
        return <button disabled={true} className={props.className}><div className="spinner-border spinner-border-sm" role="status"></div> Processing...</button>
    }

};

export default UserFormSubmit;