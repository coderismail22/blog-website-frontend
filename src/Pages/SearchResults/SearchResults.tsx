import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "@/api/axiosInstance";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  console.log("query", query);
  useEffect(() => {
    const fetchArticles = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/posts/search/query?q=${query}`
        );
        setArticles(data?.data);
        console.log("data", data?.data?.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Search results for: <span className="text-blue-600">{query}</span>
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading articles...</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-600">No articles found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article) => (
            <Link to={`/post-details/${article.slug}`} key={article.id} className="bg-white p-4 rounded-lg shadow">
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
      )}
    </div>
  );
};

export default SearchResults;
