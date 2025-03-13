import ForgotPasswordUI from "@/components/forgotPasswordUI";
import { useState } from "react";

const Forgotpasword =() =>{
    const [email,setEmail] = useState("");

    
    return<>
    <ForgotPasswordUI/>
    </>
}
export default Forgotpasword;