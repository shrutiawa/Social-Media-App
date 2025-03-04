import * as yup from "yup";

const validationSchema = yup.object().shape({
    first_name: yup.string().trim(),
    last_name: yup.string().trim(),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phone_number: yup.string().matches(/^[0-9]{10}$/,"Phone number must be exactly 10 digits").required("Phone number is required"),
    DOB: yup.string().nullable().matches(/^\d{4}-\d{2}-\d{2}$/,"Invalid date format. Use YYYY-MM-DD").test("isValidDate", "Invalid date", (value) => {
        if (!value) return true;
        return !isNaN(Date.parse(value)); 
    }),
    gender: yup.string().oneOf(["male","female","other",""], "Invalid gender selection"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirm_password: yup.string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
});
export default validationSchema;