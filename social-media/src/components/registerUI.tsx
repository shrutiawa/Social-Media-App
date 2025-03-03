import Link from "next/link";
import { useState } from "react";
import validationSchema from "../utils/yup-validation";

const RegisterForm = ({formData, handleChange, handleSubmit, errors} :any) => {
    console.log("In registration form",formData)

    return (
        <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
            <div className="text-center mb-12 sm:mb-16">
                <h1 className="text-3xl font-bold">SIGN UP PAGE</h1>
                <p className="text-sm mt-4 text-gray-800">
                    Already have an account?  
                    <Link href="/login" className="text-blue-600 font-semibold hover:underline ml-1">
                        Login here
                    </Link>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                    {["name", "email", "password", "confirm_password"].map((field) => (
                        <div key={field}>
                            <label className="text-gray-600 text-sm mb-2 block">
                                {field.replace("_", " ").toUpperCase()}
                            </label>
                            <input
                                name={field}
                                type={field.includes("password") ? "password" : "text"}
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder={`Enter ${field.replace("_", " ")}`}
                                onChange={handleChange}
                                onBlur={handleChange}
                                value={formData[field]}
                            />
                            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                        </div>
                    ))}
                </div>

                <button type="submit" className="mt-6 mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    Sign up
                </button>

                {errors.api && <p className="text-red-500 text-sm mt-2">{errors.api}</p>}
            </form>
        </div>
    );
};

export default RegisterForm;