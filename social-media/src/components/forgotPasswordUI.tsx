import Link from "next/link";
import { useState } from "react";

const ForgotPasswordUI = ({
    label,
    type,
    fields,
    onSubmit,
    message,
    buttonLabel
}: any) => {
    const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onSubmit();
    } finally {
      // Optional: You can keep it loading or reset
      // setIsLoading(false);
    }
  };
    return (
        <>
            <div className="font-[sans-serif]">
                <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                    <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
                        <div>
                            <h2 className="lg:text-4xl text-3xl font-extrabold lg:leading-[55px] text-gray-800">
                                Login Page of NextJs authentication
                            </h2>
                            <p className="text-sm mt-12 text-gray-800">
                                Already have an account?
                                <Link href="/login" className="text-blue-600 font-semibold hover:underline ml-1">
                                    Login here
                                </Link>
                            </p>
                        </div>
                        <div className="min-h-screen flex flex-col items-center justify-center px-4">
                            <div className="w-full max-w-sm">
                                <h1 className="text-2xl font-bold mb-4 capitalize">{label}</h1>
                            </div>

                            {fields.map((field: any, index: number) => (
                                <input
                                    key={index}
                                    type={type}
                                    placeholder={field.placeholder}
                                    className="w-full max-w-sm border p-3 rounded mb-3"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            ))}

                            <div className="w-full max-w-sm text-left relative">
                                <button
                                    onClick={handleClick}
                                    disabled={isLoading}
                                    className={`relative w-full bg-blue-600 text-white px-4 py-2 rounded transition-opacity duration-300 overflow-hidden ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
                                        }`}
                                >
                                    {isLoading && (
                                        <span className="absolute left-0 top-0 h-full w-full bg-blue-400 animate-slide z-0" />
                                    )}
                                    <span className="relative z-10">{isLoading ? "Sending..." : buttonLabel}</span>
                                </button>
                            </div>

                            {message && (
                                <p className={`mt-2 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                                    {message.text}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ForgotPasswordUI;
