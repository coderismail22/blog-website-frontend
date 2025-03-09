import axiosInstance from "@/api/axiosInstance";
import Loader from "../Loader/Loader";
import { ScrollRestoration, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import { LucideCalendarDays } from "lucide-react";
import moment from "moment-timezone";
import SimilarPostsManual from "../SimilarPostsManual/SimilarPostsManual";

const PostDetails = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSimilar, setLoadingSimilar] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [similarPostError, setSimilarPostError] = useState<string | null>(null);
  const [post, setPost] = useState("");
  const [similarPosts, setSimilarPosts] = useState([]);

  // Fetch post details
  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/posts/${slug}`);
        const post = response.data.data;
        setPost(post);
      } catch (err) {
        console.error("API Request Error:", err);
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [slug]);

  // Fetch similar posts
  useEffect(() => {
    if (!post?._id) return; // ✅ Prevents API call if post is not yet available

    const fetchSimilarPosts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/posts/${post?._id}/similar`);
        const similarPosts = response?.data?.data;

        setSimilarPosts(similarPosts);
      } catch (err) {
        console.error("API Request Error:", err);
        setSimilarPostError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarPosts();
  }, [post?._id]);

  if (loading || loadingSimilar) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="text-center text-red-500">
        Could not fetch post details.
      </div>
    );
  }
  if (similarPostError) {
    return (
      <div className="text-center text-red-500">
        Could not fetch similar posts.
      </div>
    );
  }

  return (
    <div>
      <ScrollRestoration />
      {/* Title */}
      <div className="bg-black text-white">
        <p className="text-3xl lg:text-5xl py-20 font-Playfair lg:w-1/2 text-center mx-auto">
          {post?.title}
        </p>
      </div>
      {/* Cover Image */}
      <div className="flex flex-col items-center justify-center">
        <img src={post?.coverImage} alt="" />
      </div>

      {/* Author & Publish Date */}
      <div className="lg:w-1/2 px-5 mx-auto">
        <div className="space-y-2 py-5 ">
          <p className="flex text-[12px] gap-2 items-center ">
            <PersonIcon />
            Author: {post?.author}
          </p>
          <p className="flex text-[12px] gap-2 items-center ">
            <LucideCalendarDays className="w-[14px]" />
            Published:
            {moment(post?.createdAt).tz("Asia/Dhaka").fromNow()}
          </p>
        </div>

        {/* Content */}
        <div>
          <p
            className="text-xl"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          ></p>
        </div>

        {/* SimlarPosts (Automatic) */}
        {/* <SimilarPostsAutomatic similarPosts={similarPosts} /> */}

        {/* Similar/Related Post(Manually) */}
        <SimilarPostsManual similarPosts={post?.relatedPosts} />
      </div>
    </div>
  );
};

export default PostDetails;
