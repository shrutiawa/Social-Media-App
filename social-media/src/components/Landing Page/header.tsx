import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaBell, FaEnvelope, FaHome, FaSearch, FaUser } from "react-icons/fa";

export const Header = () => {
  const router = useRouter();

  const navItems = [
    { icon: <FaHome />, label: "Home", href: "/" },
    { icon: <FaBell />, label: "Notifications" },
    { icon: <FaEnvelope />, label: "Messages" },
    { icon: <FaUser />, label: "Profile", href: "/Profile" },
  ];

  return (
    <header className="w-full bg-white shadow h-auto">
      <div className="flex justify-between items-center px-4 md:px-6 py-4 overflow-x-auto whitespace-nowrap">
        {/* Left section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-800">LetsMeet</h1>

          {/* Search */}
          <div className="relative w-28 sm:w-40 md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-2xl pl-10 pr-3 py-2 text-sm w-full"
            />
          </div>

          {/* Navigation */}
          <div className="flex gap-2 md:gap-4 text-gray-600 flex-nowrap">
            {navItems.map((item, index) =>
              item.href ? (
                <Link key={index} href={item.href} passHref legacyBehavior>
                  <a className="flex items-center gap-1 px-2 md:px-3 py-2 rounded-2xl hover:bg-gray-200 hover:text-blue-600 cursor-pointer">
                    {item.icon}
                    <span className="hidden lg:inline text-sm font-medium">{item.label}</span>
                  </a>
                </Link>
              ) : (
                <div
                  key={index}
                  className="flex items-center gap-1 px-2 md:px-3 py-2 rounded-2xl hover:bg-gray-200 hover:text-blue-600 cursor-pointer"
                >
                  {item.icon}
                  <span className="hidden lg:inline text-sm font-medium">{item.label}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <Image
            src="/image-20240911-061331.png"
            alt="User"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="hidden lg:block text-sm font-semibold text-gray-800">
            Reinhard Vein Z
          </div>
          <button className="text-sm hover:bg-blue-600 hover:text-white px-3 py-1 rounded-2xl whitespace-nowrap">
            Switch
          </button>
        </div>
      </div>
    </header>
  );
};
