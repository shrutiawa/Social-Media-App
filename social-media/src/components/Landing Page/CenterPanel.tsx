
import Image from "next/image";
import { FaChartBar, FaGlobe, FaRegImage, FaSmile, FaVideo } from "react-icons/fa";

export const CenterPanel = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-white p-4 rounded-2xl shadow space-y-4 w-full max-w-2xl">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image src="/image-20240911-061331.png" alt="User" width={40} height={40} />
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Share something..."
              className="w-full bg-gray-100 rounded-2xl py-2 px-4 pl-4 text-sm focus:outline-none block"
            />
            <FaSmile className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-600 text-sm mt-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer">
              <FaRegImage />
              <span>Image</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaVideo />
              <span>Video</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaChartBar />
              <span>Poll</span>
            </div>
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <FaGlobe />
            <span>Public</span>
          </div>
        </div>
      </div>
    </div>
  );
};
