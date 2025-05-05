import ForgotPasswordUI from "@/components/forgotPasswordUI";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const email = useSelector((state) => state.forgotPassword.email);

  useEffect(() => {
    if (!email) router.push("/forgot-password");
  }, [email, router]);

  const handleVerifyOTP = async () => {
    try {
      await axios.post("/api/auth/verify-otp", { email, otpValue: otp });
      router.push("/reset-password");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "OTP verification failed",
      });
    }
  };

  return (
    <ForgotPasswordUI
     label="OTP Verification"
      type="text"
      fields={[
        {
          name: "otp",
          placeholder: "Enter OTP",
          value: otp,
          onChange: setOtp,
        },
      ]}
      onSubmit={handleVerifyOTP}
      message={message}
      buttonLabel="Verify OTP"
    />
  );
};

export default OtpVerification;
