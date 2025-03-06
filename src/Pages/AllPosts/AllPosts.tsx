import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import moment from "moment-timezone";
import Loader from "@/components/Loader/Loader";

const AllPosts = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/posts/get-all-category-post/${category}`
        );
        setPosts(response.data.data);
      } catch (err) {
        console.error("API Request Error:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [category]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="w-[80%] mx-auto py-10">
      <h1 className="text-3xl font-bold text-center capitalize">
        {category} Posts
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-3">
                <Link
                  to={`/post-details/${post.slug}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Published: {moment(post.createdAt).tz("Asia/Dhaka").fromNow()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No posts available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
