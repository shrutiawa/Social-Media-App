import ForgotPasswordUI from "@/components/forgotPasswordUI";
import { setEmail } from "@/store/forgotPasswordSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
    const [emailInput, setEmailInput] = useState("");
    const [message, setMessage] = useState(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSendOTP = async () => {
        try {
            await axios.post("/api/auth/send-otp", { email: emailInput });
            dispatch(setEmail(emailInput));
            router.push("/otp-verification");
        } catch (error) {
            setMessage({
                type: "error",
                text: error.response?.data?.message || "Failed to send OTP",
            });
        }
    };

    return (
        <ForgotPasswordUI
            label="Forgot Password"
            type="email"
            fields={[
                {
                    name: "email",
                    placeholder: "Enter your email",
                    value: emailInput,
                    onChange: setEmailInput,
                },
            ]}
            onSubmit={handleSendOTP}
            message={message}
            buttonLabel="Send OTP"
        />
    );
};

export default ForgotPassword;
