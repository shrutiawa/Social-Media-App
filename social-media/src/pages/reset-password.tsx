import ForgotPasswordUI from "@/components/forgotPasswordUI";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const router = useRouter();
  const email = useSelector((state) => state.forgotPassword.email);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!email) router.push("/forgot-password");
  }, [email, router]);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    try {
      await axios.post("/api/auth/reset-password", {
        email,
        password: newPassword,
      });

      setMessage({ type: "success", text: "Password reset successful!" });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Password reset failed",
      });
    }
  };

  return (
    <ForgotPasswordUI
     label="Reset Password"
      type="password"
      fields={[
        {
          name: "newPassword",
          placeholder: "New Password",
          value: newPassword,
          onChange: setNewPassword,
        },
        {
          name: "confirmPassword",
          placeholder: "Confirm Password",
          value: confirmPassword,
          onChange: setConfirmPassword,
        },
      ]}
      onSubmit={handleResetPassword}
      message={message}
      buttonLabel="Reset Password"
    />
  );
};

export default ResetPassword;
