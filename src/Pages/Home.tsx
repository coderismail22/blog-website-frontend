import axiosInstance from "@/api/axiosInstance";
import ArticleCounter from "@/components/ArticleCounter/ArticleCounter";
import Banner from "@/components/Banner/Banner";
import BreakingNews from "@/components/BreakingNews/BreakingNews";
import NewsSection from "@/components/NewsSection/NewsSection";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [newsSections, setNewsSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [articleCount, setArticleCount] = useState(0);
  const [breakingNews, setBreakingNews] = useState<any>(null);
  const [latestFeaturedPost, setLatestFeaturedPost] = useState<any>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axiosInstance.get("/posts");
        const data = res?.data?.data;
        setArticleCount(data.length);
        setBreakingNews(data);

        //  Find and set the latest featured post
        const latestFeaturedPost = data
          .filter((post: any) => post.isFeatured) // Filter posts with isFeatured === true
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt as string).getTime() -
              new Date(a.createdAt as string).getTime()
          )[0]; // Sort by date (latest first) & pick first item
        setLatestFeaturedPost(latestFeaturedPost || null); // ✅ Store the latest featured post

        // ✅ Step 1: Group posts by category._id & pick the most recent one
        const categoryMap = new Map<string, any>();

        data.forEach((post: any) => {
          const categoryId = post.category?._id; // ✅ Extract category._id
          if (!categoryId) return; // Skip if category is missing

          if (!categoryMap.has(categoryId)) {
            categoryMap.set(categoryId, post);
          } else {
            const existingPost = categoryMap.get(categoryId);
            if (new Date(post.createdAt) > new Date(existingPost.createdAt)) {
              categoryMap.set(categoryId, post);
            }
          }
        });

        // ✅ Step 2: Convert to array & process posts
        const processedData = Array.from(categoryMap.values()).map(
          (post: any) => ({
            ...post,
            author:
              post.author && typeof post.author === "object"
                ? post.author
                : null,
            relatedPosts: post.relatedPosts.length
              ? post.relatedPosts
              : getAutoRelatedPosts(post, data), // ✅ Only fetch from the same category

            sidebarPosts: post.sidebarPosts.length
              ? post.sidebarPosts
              : getAutoSidebarPosts(post, data), // ✅ Also ensure same category for sidebar
          })
        );

        setNewsSections(processedData);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getAutoRelatedPosts = (currentPost: any, allPosts: any[]) => {
    if (!currentPost.category || !currentPost.category._id) return [];

    const related = allPosts
      .filter(
        (p) =>
          p._id !== currentPost._id &&
          p.category?._id?.toString() === currentPost.category?._id?.toString()
      )
      .slice(0, 3);
    // console.log(`🔎 Related Posts for ${currentPost.title}:`, related);

    return related.length ? related : []; // ✅ Explicitly return [] if no posts found
  };

  const getAutoSidebarPosts = (currentPost: any, allPosts: any[]) => {
    if (!currentPost.category || !currentPost.category._id) return [];

    // First, get related posts
    const relatedPosts = getAutoRelatedPosts(currentPost, allPosts);

    // Then, filter sidebar posts from the same category but exclude related posts
    const sidebar = allPosts
      .filter(
        (p) =>
          p._id !== currentPost._id &&
          p.category?._id?.toString() ===
            currentPost.category?._id?.toString() &&
          !relatedPosts.some((relatedPost: any) => relatedPost._id === p._id) // Exclude related posts
      )
      .slice(0, 2); // Limit to 2 posts for the sidebar

    return sidebar.length ? sidebar : []; // Return empty array if no sidebar posts found
  };

  const formattedTrendingData = [
    {
      key: "1",
      label: (
        <span className="font-semibold text-lg text-red-600">Trending</span>
      ),
      children: (
        <div className="mt-4">
          {breakingNews?.slice(0, 5)?.map((news, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-3 py-3 border-b"
            >
              <div className="flex gap-4">
                <div className="">
                  <span className="text-red-600 font-semibold text-4xl">
                    {index + 1}.
                  </span>
                </div>
                <div>
                  <Link
                    to={`/post-details/${news.slug}`}
                    className="text-black font-semibold font-siliguri"
                  >
                    {news.title}
                  </Link>
                  <p className="text-gray-500 text-sm">
                    By{" "}
                    <span className="text-blue-600 font-medium">
                      {news?.author?.name || "Unknown"}
                    </span>
                  </p>
                </div>
              </div>
              {/* <div className="">
                <FaRegBookmark className="text-2xl text-blue-600" />
              </div> */}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="hidden md:block">
          <BreakingNews BreakingNewsData={breakingNews} />
        </div>
        <div>
          <Banner
            trendingData={formattedTrendingData}
            latestFeaturedPost={latestFeaturedPost}
          />
        </div>
        {user?.role === "admin" && <ArticleCounter count={articleCount} />}
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : newsSections.length === 0 ? (
          <p className="text-center text-lg my-10">No posts to show</p>
        ) : (
          newsSections.map((section, index) => (
            <div key={section._id}>
              <NewsSection post={section} flexReverse={index % 2 !== 0} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default HomePage;
