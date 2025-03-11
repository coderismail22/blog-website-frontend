import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import axiosInstance from "@/api/axiosInstance";

const QuoteOfTheDay = () => {
  const [quote, setquote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axiosInstance.get("/quote");
        if (response.data.data.length > 0) {
          setquote(response.data.data[0]); // Set first notice
        } else {
          // If no notice exists, create a random one
          const randomBanner = await axiosInstance.post("/quote/create-quote", {
            quote: `Quote of the Day - ${Math.floor(Math.random() * 1000)}`,
            author: "N/A",
          });
          setquote(randomBanner.data.data);
        }
      } catch (err) {
        console.error("Error fetching quote banner:", err);
        setError("Failed to fetch the quote banner.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="border border-[#EAE4C8] p-6 rounded-lg text-center max-w-3xl mx-auto shadow-sm">
      <div className="relative">
        <h2 className="uppercase text-gray-500 text-sm tracking-wide before:content-[''] before:absolute before:w-16 before:h-[2px] before:bg-[#EAE4C8] before:left-0 before:top-1/2 after:content-[''] after:absolute after:w-16 after:h-[2px] after:bg-[#EAE4C8] after:right-0 after:top-1/2">
          Quote of the Day
        </h2>
      </div>
      <p className="text-center text-xl font-semibold mt-4">
        {quote?.quote}
      </p>
      <p className="font-semibold mt-3">
        <span className="text-black">{quote?.author}</span>
      </p>
    </div>
  );
};

export default QuoteOfTheDay;
