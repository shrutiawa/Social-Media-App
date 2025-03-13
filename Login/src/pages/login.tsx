import { signIn } from "next-auth/react"; 
import Link from "next/link";
import { useState } from "react";
import schema from "../utils/login-yup-validation";
import * as yup from "yup";

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
      });

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
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
          <div>
            <h2 className="lg:text-4xl text-3xl font-extrabold lg:leading-[55px] text-gray-800">
              Login Page of NextJs authentication
            </h2>
            <p className="text-sm mt-12 text-gray-800">
              Don't have an account?
              <Link href="/register" className="text-blue-600 font-semibold hover:underline ml-1">
                Register here
              </Link>
            </p>
          </div>

          <form className="max-w-md md:ml-auto w-full">
            <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Sign in</h3>

            <div className="space-y-4">
              <div>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent ${
                    errors.email ? "border-red-500 border" : ""
                  }`}
                  placeholder="Email address"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent ${
                    errors.password ? "border-red-500 border" : ""
                  }`}
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-500 font-semibold">
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            <div className="!mt-8">
              <button
                onClick={handleClick}
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
            </div>

            {message && (
              <p className={`mt-4 text-sm font-semibold ${message.type === "error" ? "text-red-500" : "text-green-600"}`}>
                {message.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
