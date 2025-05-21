
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChartBar, FaEdit, FaGlobe, FaRegImage, FaSmile, FaTimes, FaVideo } from "react-icons/fa";
import { PostCard } from "./PostCard";

export const CenterPanel = () => {
  const { data: session,status } = useSession();
  const [postText, setPostText] = useState("");
  const [posts,setPosts]=useState([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("chnaged,changed,chnaged")
      fetchPosts();
    }
  }, [status]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts"); 
      console.log("getting the post",response.data)
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handleImageIconClick = () => {
    fileInputRef.current?.click();
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!postText.trim() || !session?.user?.id) return;

    let imageUrl = "";
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "social_app"); 

      try {
        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dd5m97s9l/image/upload", 
          formData
        );

        imageUrl = uploadResponse.data.secure_url; 
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    await axios.post("/api/posts", {
      userId: session.user.id,
      content: postText,
      image: imageUrl,
    });
    setPostText("");
    setSelectedImage(null);
    setImagePreview(null);
    fetchPosts();
  };
  const handleEdit = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setImagePreview("");
  };
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
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <FaSmile className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        {imagePreview && (
        <div className="relative">
          <img src={imagePreview} alt="Preview" className="rounded-xl w-full h-auto" />
          <div className="absolute bottom-2 right-2 flex gap-2">
            <button onClick={handleEdit} className="bg-gray-500 rounded-full p-1 shadow">
              <FaEdit className="text-white" />
            </button>
            <button onClick={handleCancel} className="bg-gray-500 rounded-full p-1 shadow">
              <FaTimes className="text-white" />
            </button>
          </div>
        </div>
      )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <div className="flex items-center justify-between text-gray-600 text-sm mt-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleImageIconClick}>
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
        {postText.trim() && (
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-1 rounded-2xl text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-1 rounded-2xl text-sm"
            >
              Post
            </button>
          </div>
        )}
      </div>
        <div className="mt-6 space-y-4 w-full max-w-2xl">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            user={post.user} 
          />
        ))}
      </div>
    </div>
  );
};
