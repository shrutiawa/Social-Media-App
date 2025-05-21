import { FaHeart, FaComment, FaPaperPlane, FaRegHeart } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const formatHoursAgo = (dateString) => {
  const createdAt = new Date(dateString);
  const now = new Date();
  const diffMs = now - createdAt;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return "just now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  }
};

export const PostCard = ({ user, post }) => {
  const { data: session, status } = useSession();
  console.log("this is the session i am getting",session)
  const [liked, setLiked] = useState(false);
  const [likedUser, setLikedUser] = useState(post.likes)
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showLikedUsers, setShowLikedUsers] = useState(false);

  const timeAgo = formatHoursAgo(post.createdAt);
  useEffect(() => {
    if (session?.user?.id && post?.likes) {
      setLiked(post.likes.includes(session.user.id));
    }
  }, [session, post.likes]);
  const handleLike = async () => {
    if (!session?.user?.id) return alert("Please sign in to like posts");
    try {
      const response = await axios.post('/api/like/post', { postId: post._id });;
      console.log("Liked b=number", response.data)
      setLiked(response.data.liked);
      setLikeCount(response.data.likes);
      setLikedUser(response.data.likedUser);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  const toggleLike = () => {
    setShowLikedUsers(prev => !prev);
  }
  console.log("liked user",likedUser)
  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full max-w-xl mx-auto space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="font-semibold">{user?.first_name}</p>
        </div>
        <p className="text-xs text-gray-400">{timeAgo}</p>

        <button className="text-gray-500 text-xl">⋮</button>

      </div>
      <p className="text-sm">{post.content}</p>
      {post.image && (
        <div className="relative w-full max-w mx-auto h-[300px] rounded-xl overflow-hidden shadow-inner">
          <Image
            src={post.image}
            alt="Post"
            fill
            className="object-cover"
            sizes="300px"
            priority
          />
        </div>
      )}
      <div className="flex items-center justify-between text-sm text-gray-600 pt-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button onClick={handleLike}>
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
            {likeCount > 0 && <button onClick={toggleLike}>{likeCount} likes</button>}
          </div>
          {showLikedUsers && likedUser.length > 0 && (
            <div className="absolute  left-1/2 transform -translate-x-1/2 w-64 bg-white shadow-lg rounded-lg border z-50 p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Liked by:</h4>
              <ul className="space-y-1 max-h-40 overflow-y-auto text-sm text-gray-800">
                {likedUser.map((user) => (
                  <li key={user._id}>{user.first_name} {user.last_name}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex items-center gap-1">
            <FaComment /> <span>{post.comments || 0}</span>
          </div>
        </div>
        <FaPaperPlane className="cursor-pointer" />
      </div>

      {/* Comment Box */}
      <div className="flex items-center gap-2 border rounded-full px-3 py-1">
        <input type="text" placeholder="Write your comment" className="flex-1 text-sm focus:outline-none" />
      </div>
    </div>
  );
};
