import { useState, useEffect } from "react";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import Loader from "@/components/Loader/Loader";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/handleAxiosError";

const Quote = () => {
  const [quoteData, setQuoteData] = useState<{
    _id: string;
    quote: string;
    author: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axiosInstance.get("/quote");
        if (response.data.data.length > 0) {
          setQuoteData(response.data.data[0]); // Set first quote
        } else {
          // If no quote exists, create a random one
          const randomQuote = await axiosInstance.post("/quote/create-quote", {
            quote: `Quote of the Day - ${Math.floor(Math.random() * 1000)}`,
            author: "Unknown",
          });
          setQuoteData(randomQuote.data.data);
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
        setError("Failed to fetch the quote.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  const handleUpdate = async (data: { quote: string; author: string }) => {
    if (!quoteData?._id) {
      Swal.fire("Error!", "No quote ID found!", "error");
      return;
    }

    try {
      await axiosInstance.patch(`/quote/update-quote/${quoteData._id}`, data);
      setQuoteData((prev) => (prev ? { ...prev, ...data } : null));
      Swal.fire("Updated!", "Quote updated successfully!", "success");
    } catch (err) {
      handleAxiosError(err as AxiosError, "Failed to update quote");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Update Quote of the Day
      </h1>

      {quoteData && (
        <AppForm
          onSubmit={handleUpdate}
          defaultValues={{ quote: quoteData.quote, author: quoteData.author }}
          buttonText="Update Quote"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <AppInput name="quote" label="Quote" placeholder="Enter Quote" />
            <AppInput
              name="author"
              label="Author"
              placeholder="Enter Author Name"
            />
          </div>
        </AppForm>
      )}
    </div>
  );
};

export default Quote;
