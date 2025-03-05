import Advertisement from "@/components/Advertisement/Advertisement";
import FeaturedArticle from "@/components/FeaturedArticle/FeaturedArticle";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import LatestNews from "@/components/LatestNews/LatestNews";
import getTimeAgo from "@/utils/getTimeAgo";
import { Link } from "react-router-dom";

const Home = () => {
  const homePageData = {
    featuredArticle: {
      title: "Featured Article Title",
      featuredImage: "/placeholder.svg?height=300&width=600",
      createdAt: "2025-02-20T10:00:00Z",
      slug: "featured-article-slug",
      category: { name: "Category" },
    },
    latestArticles: [
      {
        title: "Latest Article 1",
        featuredImage: "/placeholder.svg?height=200&width=300",
        createdAt: "2025-02-20T12:00:00Z",
        slug: "latest-article-1",
        category: { name: "News" },
      },
      {
        title: "Latest Article 2",
        featuredImage: "/placeholder.svg?height=200&width=300",
        createdAt: "2025-02-20T13:00:00Z",
        slug: "latest-article-2",
        category: { name: "Technology" },
      },
      {
        title: "Latest Article 2",
        featuredImage: "/placeholder.svg?height=200&width=300",
        createdAt: "2025-02-20T13:00:00Z",
        slug: "latest-article-2",
        category: { name: "Technology" },
      },
    ],
    allArticles: [
      {
        category: { name: "International" },
        articles: [
          {
            title: "Global Summit",
            featuredImage: "/placeholder.svg?height=150&width=200",
            createdAt: "2025-02-20",
          },
          {
            title: "Climate Change",
            featuredImage: "/placeholder.svg?height=150&width=200",
            createdAt: "2025-02-19",
          },
        ],
      },
      {
        category: { name: "Business" },
        articles: [
          {
            title: "Stock Market Rise",
            featuredImage: "/placeholder.svg?height=150&width=200",
            createdAt: "2025-02-18",
          },
          {
            title: "Tech Companies Earnings",
            featuredImage: "/placeholder.svg?height=150&width=200",
            createdAt: "2025-02-17",
          },
        ],
      },
    ],
  };

  const sideNews = [
    {
      title: "Latest Updates on Local Politics",
      category: "Politics",
      time: "2 hours ago",
    },
    {
      title: "Weather Forecast for the Week",
      category: "Weather",
      time: "3 hours ago",
    },
    {
      title: "Entertainment Industry News",
      category: "Entertainment",
      time: "4 hours ago",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <FeaturedArticle featuredArticle={homePageData.featuredArticle} />
          <LatestNews latestNews={homePageData.latestArticles} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homePageData.allArticles.map((section, index) => (
              <div className="mb-6" key={index}>
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-red-600 pb-2">
                  {section.category.name}
                </h2>
                <div className="space-y-4">
                  {section.articles.map((article, index) => (
                    <Link
                      to={`/news/${article.slug}`}
                      key={index}
                      className="flex gap-4"
                    >
                      <div className="relative w-32 h-24">
                        <ImageComponent
                          src="/default.jpg"
                          alt={article.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <span className="text-sm text-red-600 block">
                          {getTimeAgo(article.createdAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/4">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-red-600 pb-2">
              Latest Updates
            </h2>
            <div className="space-y-4">
              {sideNews.map((news, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                >
                  <span className="text-sm text-red-600 block">
                    {news.category}
                  </span>
                  <h3 className="font-semibold mb-1">{news.title}</h3>
                  <span className="text-sm text-gray-500">{news.time}</span>
                </div>
              ))}
            </div>
          </div>

          <Advertisement
            src="/images/codesharer.webp"
            alt="Advertisement 1"
            width={300}
            height={250}
          />
          <Advertisement
            src="/placeholder.svg?height=250&width=300"
            alt="Advertisement 2"
            width={300}
            height={250}
          />
          <Advertisement
            src="/placeholder.svg?height=250&width=300"
            alt="Advertisement 3"
            width={300}
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
