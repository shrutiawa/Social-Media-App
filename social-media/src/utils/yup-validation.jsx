import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirm_password: yup.string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
});
export default validationSchema;