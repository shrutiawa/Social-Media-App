import { useReducer } from "react";
import validationSchema from "../utils/yup-validation";
import RegisterForm from "../components/registerUI";
import axios from "axios";
import {toast} from "react-toastify"

const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    DOB:  null,
    gender: "",
    password: "",
    confirm_password: "",
    errors: {},
};

const formReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_ERRORS":
            return { ...state, errors: action.errors };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

const RegisterService = () => {
    // Step 3: Use useReducer Hook
    const [state, dispatch] = useReducer(formReducer, initialState);

    // Step 4: Handle Input Change with Validation
    const handleChange = async (e) => {
        const { name, value } = e.target;

        dispatch({ type: "UPDATE_FIELD", field: name, value });

        try {
            await validationSchema.validateAt(name, { [name]: value });
            dispatch({ type: "SET_ERRORS", errors: { ...state.errors, [name]: "" } });
        } catch (err) {
            dispatch({ type: "SET_ERRORS", errors: { ...state.errors, [name]: err.message } });
        }
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(state, { abortEarly: false }); 
            await axios.post("/api/auth/Register/route", state);
            toast.success("User added successfully!!")

            dispatch({ type: "RESET" });
        } catch (error) {
            if (error.response) {
                // API Error Response
                toast.error(`${error.response.data.message} `);
            }else if (error.inner) {  
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                dispatch({ type: "SET_ERRORS", errors: newErrors });
            } else {
                toast.error("Something went wrong!");
            }
        }
    };

    return (
        <RegisterForm
            formData={state}
            errors={state.errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default RegisterService;
