import Link from "next/link";
import { useState } from "react";
import validationSchema from "../utils/yup-validation";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({});

    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validation = await validationSchema.validate(formData, { abortEarly: false });
            console.log("validation form dara", validation);
            console.log("Form submitted successfully:", formData);
            setErrors({});
        } catch (err) {
            const newErrors = {};
            console.log("this inner inside error", err.inner);
            err.inner.forEach((error) => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
        }
    };

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
                    <div>
                        <label className="text-gray-600 text-sm mb-2 block">Name</label>
                        <input 
                            name="name" 
                            type="text" 
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" 
                            placeholder="Enter name" 
                            onChange={handleChange}
                            onBlur={handleChange}
                            value={formData.name}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="text-gray-600 text-sm mb-2 block">Email Id</label>
                        <input 
                            name="email" 
                            type="text" 
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" 
                            placeholder="Enter email" 
                            onChange={handleChange}
                            value={formData.email}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="text-gray-600 text-sm mb-2 block">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" 
                            placeholder="Enter password" 
                            onChange={handleChange}
                            value={formData.password}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="text-gray-600 text-sm mb-2 block">Confirm Password</label>
                        <input 
                            name="confirm_password" 
                            type="password" 
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" 
                            placeholder="Enter confirm password" 
                            onChange={handleChange}
                            value={formData.confirm_password}
                        />
                        {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="mt-6 mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
