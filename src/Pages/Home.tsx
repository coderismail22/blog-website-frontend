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

        // ✅ Step 1: Group posts by category & pick the most recent one
        const categoryMap = new Map();

        data.forEach((post: any) => {
          // Check if the category already exists
          if (!categoryMap.has(post.category)) {
            categoryMap.set(post.category, post);
          } else {
            // If category exists, keep the most recent post
            const existingPost = categoryMap.get(post.category);
            if (new Date(post.createdAt) > new Date(existingPost.createdAt)) {
              categoryMap.set(post.category, post);
            }
          }
        });

        // ✅ Step 2: Process posts (ensuring relatedPosts and sidebarPosts are populated)
        const processedData = Array.from(categoryMap.values()).map(
          (post: any) => ({
            ...post,
            relatedPosts: post.relatedPosts.length
              ? post.relatedPosts
              : getAutoRelatedPosts(post, data),
            sidebarPosts: post.sidebarPosts.length
              ? post.sidebarPosts
              : getAutoSidebarPosts(post, data),
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
    return allPosts
      .filter(
        (p) => p._id !== currentPost._id && p.category === currentPost.category
      )
      .slice(0, 3);
  };

  const getAutoSidebarPosts = (currentPost: any, allPosts: any[]) => {
    return allPosts.filter((p) => p._id !== currentPost._id).slice(0, 2);
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        newsSections.map((section, index) => (
          <NewsSection
            key={section._id}
            post={section}
            flexReverse={index % 2 !== 0}
          />
        ))
      )}
    </div>
  );
};

export default HomePage;
