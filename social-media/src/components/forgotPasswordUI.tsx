import Link from "next/link";
import { useState } from "react";
import schema from "../utils/login-yup-validation";
import * as yup from "yup";
import axios from "axios";

const ForgotPasswordUI = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtpSent] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)


    };

    const handleSendOTP = async () => {
        try {
            await axios.post("/api/auth/send-otp", { email });
            setOtpSent(true);
        } catch (error) {
            console.error("Error sending OTP", error);
        }
    };

    const handleVerifyOTP = async () => {
        console.log("handle verify called")
        // setOtpSent(true);
        try {
           const data=  await axios.post("/api/auth/verify-otp", { otpValue });
           console.log("verify otp",data);
        //    alert(data.message);
        } catch (error) {
            console.error("Error sending OTP", error);
        }
    };


    return <>
        <div className="font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
                    <div>
                        <h2 className="lg:text-4xl text-3xl font-extrabold lg:leading-[55px] text-gray-800">
                            Forgot Password
                        </h2>
                        <p className="text-sm mt-12 text-gray-800">
                            Already have account?
                            <Link href="/login" className="text-blue-600 font-semibold hover:underline ml-1">
                                Login here
                            </Link>
                        </p>
                    </div>

                    <form className="max-w-md md:ml-auto w-full">
                        <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Forgot Password</h3>
                        {!otp && <>
                            <div className="space-y-4">
                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className={`bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent `}
                                        placeholder="Email address"
                                        onChange={handleChange}
                                        value={email}
                                    />
                                    {/* {email && <p className="text-red-500 text-xs mt-1">{email}</p>} */}
                                </div>

                            </div>

                            <div className="!mt-8">
                                <button
                                    onClick={handleSendOTP}
                                    type="button"
                                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                >
                                    SEND OTP
                                </button>
                            </div>
                        </>
                        }
                        {/* 
            {message && (
              <p className={`mt-4 text-sm font-semibold ${message.type === "error" ? "text-red-500" : "text-green-600"}`}>
                {message.text}
              </p>
            )} */}
                        {true && (
                            <div>
                                <h2 className="text-xl font-semibold">Enter OTP</h2>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    className="w-full p-2 border rounded mt-2"
                                    value={otpValue}
                                    onChange={(e) => setOtpValue(e.target.value)}
                                />
                                <button
                                    onClick={handleVerifyOTP}
                                    className="w-full bg-green-500 text-white p-2 mt-2 rounded"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    </>
}
export default ForgotPasswordUI;