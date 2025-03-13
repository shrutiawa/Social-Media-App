import Link from "next/link";

const RegisterForm = ({ formData, handleChange, handleSubmit, errors }: any) => {


    return (
        <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
            <div className="text-center mb-12 sm:mb-10">
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
                    <div className="grid grid-cols-2 gap-6">
                        {["first_name", "last_name"].map((field) => (
                            <div key={field}>
                                <label className="text-gray-600 text-sm mb-2 block ">
                                    {field.replace("_", " ").toUpperCase()}
                                </label>
                                <input
                                    name={field}
                                    type="text"
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

                    {/* Email & Phone Number */}
                    <div className="grid gap-6 grid-cols-2">
                        {["email", "phone_number"].map((field) => (
                            <div key={field} >
                                <label className="text-gray-600 text-sm mb-2 block">
                                    {field.replace("_", " ").toUpperCase()}
                                </label>
                                <input
                                    name={field}
                                    type={field === "email" ? "email" : "text"}
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

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">DATE OF BIRTH</label>
                            <input
                                name="DOB"
                                type="date"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                onChange={handleChange}
                                onBlur={handleChange}
                                value={formData.DOB|| ""}
                            />
                            {errors.DOB && <p className="text-red-500 text-sm">{errors.DOB}</p>}
                        </div>

                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">GENDER</label>
                            <select
                                name="gender"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                onChange={handleChange}
                                onBlur={handleChange}
                                value={formData.gender|| ""}
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {["password", "confirm_password"].map((field) => (
                            <div key={field}>
                                <label className="text-gray-600 text-sm mb-2 block">
                                    {field.replace("_", " ").toUpperCase()}
                                </label>
                                <input
                                    name={field}
                                    type="password"
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
                </div>

                <button type="submit" className="mt-6 mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    Sign up
                </button>

            </form>
        </div>
    );
};

export default RegisterForm;