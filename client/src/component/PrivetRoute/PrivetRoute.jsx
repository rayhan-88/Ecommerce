import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


const PrivetRoute = ({children}) => {
  const navigate = useNavigate();
  const isLogin = Cookies.get("token")
    return !!isLogin === true ? children : navigate('/login');
}
export default PrivetRoute;


