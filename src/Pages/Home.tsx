import axiosInstance from "@/api/axiosInstance";
import NewsSection from "@/components/NewsSection/NewsSection";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [newsSections, setNewsSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axiosInstance.get("/posts");
        const data = res?.data?.data;

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
                : null, // Ensure author is an object
            relatedPosts: post.relatedPosts.length
              ? post.relatedPosts
              : getAutoRelatedPosts(post, data),
            sidebarPosts: post.sidebarPosts.length
              ? post.sidebarPosts
              : getAutoSidebarPosts(post, data),
          })
        );

        setNewsSections(processedData);
        console.log("🚀 Processed Data:", processedData);
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

    return allPosts
      .filter(
        (p) =>
          p._id !== currentPost._id &&
          p.category?._id?.toString() === currentPost.category?._id?.toString()
      )
      .slice(0, 3);
  };

  const getAutoSidebarPosts = (currentPost: any, allPosts: any[]) => {
    if (!currentPost.category || !currentPost.category._id) return [];

    return allPosts
      .filter(
        (p) =>
          p._id !== currentPost._id &&
          p.category?._id?.toString() !== currentPost.category?._id?.toString()
      )
      .slice(0, 2);
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        newsSections.map((section, index) => (
          <div>
            <NewsSection
              key={section._id}
              post={section}
              flexReverse={index % 2 !== 0}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
