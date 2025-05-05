import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import schema from "../utils/login-yup-validation";
import * as yup from "yup";
import LoginUI from "@/components/loginUI";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      await schema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    } catch (err) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: (err as yup.ValidationError).message }));
    }
  };

  const handleClick = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      setMessage(null);

      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })
      
      console.log("NextAuth SignIn Response:", result);

      if (result?.error) {
        throw new Error(result.error);
      }

      setMessage({ text: "Login successful! Redirecting...", type: "success" });

      // logic to implement redirection after successful login goes here.

    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else if (err instanceof Error) {
        setMessage({ text: err.message || "Something went wrong.", type: "error" });
      }
    }
  };

  return (
    <LoginUI
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      handleClick={handleClick}
      message={message}
    />
  );
};

export default Login;
