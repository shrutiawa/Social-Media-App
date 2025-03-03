import { useState } from "react";
import validationSchema from "../utils/yup-validation";
import RegisterForm from "../components/registerUI";
import axios from "axios";

const RegisterService = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({});

    // Handle input change with validation
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        try {
            await validationSchema.validateAt(name, { [name]: value });
            setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        } catch (err) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            console.log("Sending request...");
            const { data } = await axios.post("/api/auth/Register/route", formData);

            console.log("Response from API:", data);

            setFormData({ name: "", email: "", password: "", confirm_password: "" });
            setErrors({});
        } catch (error) {
            console.error("Error submitting form:", error.response?.data || error.message);
            setErrors({ api: error.response?.data?.message || "Something went wrong." });
        }
    };

    return <RegisterForm formData={formData} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} />;
};

export default RegisterService;
