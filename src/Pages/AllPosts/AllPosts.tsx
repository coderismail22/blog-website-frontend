import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import moment from "moment-timezone";
import Loader from "@/components/Loader/Loader";
import { PersonIcon } from "@radix-ui/react-icons";
import { LucideCalendarDays } from "lucide-react";
import debounce from "lodash.debounce";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";

const AllPosts = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(6); // Initial 6 visible posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Debounced search handling
  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/posts/get-all-category-post/${category}`
        );
        setPosts(response.data.data || []);
      } catch (err) {
        console.error("API Request Error:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [category]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post?.content.toLowerCase().includes(searchQuery.toLowerCase());
    const postDate = moment(post.createdAt);
    const matchesDateRange =
      (!startDate || postDate.isSameOrAfter(moment(startDate))) &&
      (!endDate || postDate.isSameOrBefore(moment(endDate)));
    return matchesSearch && matchesDateRange;
  });

  // Load More Button Handler
  const loadMore = () => {
    setVisiblePosts((prevVisibleBlogs) => prevVisibleBlogs + 6); // Load 6 more posts
  };
  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="w-[80%] mx-auto">
      <p className="text-xl font-bold text-center my-5 underline underline-offset-8">
        Category: {category}
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 ">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search posts by title or content..."
            className="bg-white border px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleSearchChange}
          />
        </div>
        {/* Date Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="bg-white border px-4 py-2 text-center rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholderText="Start Date"
            isClearable
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="bg-white border px-4 py-2 text-center rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholderText="End Date"
            isClearable
          />
        </div>
      </div>
      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
          {filteredPosts?.slice(0, visiblePosts)?.map((post) => (
            <Link
              to={`/post-details/${post?.slug}`}
              key={post._id}
              className="border p-4 rounded-lg shadow-md"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
              <p className="flex gap-1 text-sm text-gray-500">
                <PersonIcon /> {post?.author}
              </p>
              <p className="flex text-[12px] gap-2 items-center">
                <LucideCalendarDays className="w-[14px]" />
                {moment(post?.createdAt).tz("Asia/Dhaka").fromNow()}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found.</p>
      )}

      {/* Load More Button */}
      {visiblePosts < filteredPosts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPosts;
