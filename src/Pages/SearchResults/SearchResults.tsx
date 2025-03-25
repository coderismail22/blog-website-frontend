/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import SearchBar from "./SearchBar";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // To determine if there are more posts to load

  const pageSize = 6; // Number of posts per page

  useEffect(() => {
    const fetchArticles = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/posts/search/query?q=${query}&page=${page}&limit=${pageSize}`
        );

        // Filter out duplicates based on the `id` of each article
        const newArticles = data?.data || [];

        if (page === 1) {
          setArticles(newArticles);
        } else {
          setArticles((prevArticles) => [
            ...prevArticles,
            ...newArticles.filter(
              (newArticle: any) =>
                !prevArticles.some(
                  (existingArticle) => existingArticle.id === newArticle.id
                )
            ),
          ]);
        }

        // Check if there are more articles to load
        setHasMore(newArticles.length === pageSize);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query, page]); // Fetch again when `query` or `page` changes

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment the page number
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col items-center justify-center my-5">
        <SearchBar />
      </div>
      <h1 className="text-2xl font-semibold mb-4">
        Search results for: <span className="text-blue-600">{query}</span>
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading articles...</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-600">No articles found.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles?.map((article, index) => (
              <Link
                to={`/post-details/${article.slug}`}
                key={index + 1}
                className="bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={article.coverImage || "/placeholder.jpg"}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{article.title}</h2>
                <a
                  href={`/articles/${article.id}`}
                  className="text-blue-500 mt-2 inline-block"
                >
                  Read More →
                </a>
              </Link>
            ))}
          </div>

          {hasMore && (
            <button
              onClick={loadMore}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
