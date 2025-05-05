
import { Header } from "@/components/Landing Page/header";
import { SidePanel } from "@/components/Landing Page/SidePanel";
import { CenterPanel } from "@/components/Landing Page/CenterPanel";
import { Card } from "@/components/Landing Page/Card";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LandingPage() {
    const [news, setNews] = useState([]);


    useEffect(() => {
        async function fetchTrendingNews() {
            try {
                const res = await axios.get("/api/trendingNews");
                console.log("response i am getting",res)
                setNews(res.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchTrendingNews();
    }, []);
    const shortcuts = [
        { src: "/image-20240911-061331.png", label: "Art and drawing" },
        { src: "/image-20240911-061331.png", label: "Dribbble Pro" },
        { src: "/image-20240911-061331.png", label: "Behance Creative" },
        { src: "/image-20240911-061331.png", label: "One Piece Fan" },
    ];
    const users = [
        { src: "/image-20240911-061331.png", label: "Najid", follow: "Followed" ,people:"Followed by hermoine"},
        { src: "/image-20240911-061331.png", label: "Ron Wisely", follow: "Followed",people:"Followed by hii" },
        { src: "/image-20240911-061331.png", label: "Harry Potter", follow: "Follow" ,people:"Followed by she"},
        { src: "/image-20240911-061331.png", label: "MrBean", follow: "Follow",people:"Followed by some" },
    ];
console.log("i ma news",news)
    const leftTopContent = (
        <Card>
            <div className="relative bg-white rounded-[20px] text-center pb-5 w-full max-w-xs mx-auto">
                <Image
                    src="/image-20240910-115637.png"
                    alt="Header"
                    width={400}
                    height={120}
                    className="w-full h-[120px] object-cover rounded-xl"
                />

                <div className="w-[90px] h-[90px] border-4 border-white rounded-full overflow-hidden absolute top-[80px] left-1/2 transform -translate-x-1/2 bg-white">
                    <Image
                        src="/image-20240910-120507.png"
                        alt="Profile"
                        width={90}
                        height={90}
                        className="w-full h-full object-cover"
                    />
                </div>

                <h3 className="mt-[60px] mb-1 text-[20px] font-semibold">Reinhard Van Zry</h3>
                <p className="text-sm text-gray-500 mb-5">@Reinhard_</p>

                <div className="flex justify-around mb-5 text-center">
                    <div className="flex flex-col items-center">
                        <strong className="text-lg text-gray-800">250</strong>
                        <span className="text-xs text-gray-500">Post</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <strong className="text-lg text-gray-800">2022</strong>
                        <span className="text-xs text-gray-500">Followers</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <strong className="text-lg text-gray-800">590</strong>
                        <span className="text-xs text-gray-500">Following</span>
                    </div>
                </div>

                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-blue-800 transition duration-300">
                    My Profile
                </button>
            </div>
        </Card>
    );

    const leftBottomContent = (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Shortcuts</h2>
                <button className="text-sm text-gray-400 hover:underline">See all</button>
            </div>
            <div className="flex flex-col gap-4">
                {shortcuts.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <Image src={item.src} alt={item.label} width={40} height={40} className="rounded-full" />
                        <span className="text-sm font-medium">{item.label}</span>
                    </div>
                ))}
            </div>
        </Card>
    );

    const rightTopContent = (
        <Card>
            <h2 className="text-lg font-semibold mb-4">Trending News</h2>
            <div className="flex flex-col gap-4">
                {news.slice(0,5).map((item, index) => (
                    <a 
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 hover:underline"
                    >
                        {item.urlToImage && (
                            <Image
                            src={`/api/image-proxy?url=${encodeURIComponent(item.urlToImage)}`}
                            alt={item.title}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        )}
                        <p className="text-sm font-medium">{item.title}</p>
                    </a>
                ))}
            </div>
        </Card>
    );

    const rightBottomContent = (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Suggested For You</h2>
                <button className="text-sm text-gray-400 hover:underline">See all</button>
            </div>
            <div className="flex flex-col gap-4">
                {users.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Image src={item.src} alt={item.label} width={40} height={40} className="rounded-full" />
                            <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-[10px] ">{item.people}</p>
                            </div>
                        </div>
                        <button
                            className={`text-sm font-medium px-4 py-2 rounded-2xl transition
    ${item.follow === "Follow"
                                    ? "text-blue-600 "
                                    : "text-black-300"
                                }`}
                        >
                            {item.follow}
                        </button>
                    </div>
                ))}
            </div>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="flex justify-center gap-8 px-8 py-6">
                <div className="w-1/4">
                    <SidePanel topContent={leftTopContent} bottomContent={leftBottomContent} />
                </div>

                <div className="w-2/4">
                    <CenterPanel />
                </div>

                <div className="w-1/4">
                    <SidePanel topContent={rightTopContent} bottomContent={rightBottomContent} />
                </div>
            </main>
        </div>
    );
}
