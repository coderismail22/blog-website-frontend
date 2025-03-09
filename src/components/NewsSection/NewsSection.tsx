import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const NewsSection = ({ post, flexReverse }) => {
  return (
    <div className="md:w-10/12 mx-auto pb-10">
      {/* Category Title */}
      <Link
        to={`/all-posts/${post?.category?.name}`}
        className="flex gap-3 items-center border-b border-black my-5 py-4"
      >
        <p className="text-3xl">{post?.category?.name} </p>
        <FaArrowRight className="text-xl" />
      </Link>

      {/* Layout with alternating flex directions */}
      <div className={`md:flex ${flexReverse ? "flex-row-reverse" : ""}`}>
        {/* Main News Section */}
        <div
          className={`md:w-[70%] ${
            flexReverse ? "border-l md:pl-4" : "border-r md:pr-4"
          }`}
        >
          <div>
            <img
              src={post.coverImage}
              alt=""
              className="w-full border h-[50vh]"
            />
            <div className="py-5 space-y-2">
              <p className="font-Playfair font-semibold text-2xl text-center hover:underline">
                <Link to={`/post-details/${post.slug}`}>{post?.title}</Link>
              </p>
              <p className="text-center text-[12px] font-bold">
                By {post?.author?.name}
              </p>
            </div>
          </div>

          {/* Related News */}
          <div className="md:flex border-t">
            {post.relatedPosts?.slice(0, 3).map((related) => (
              <div key={related._id} className="md:border-r mr-3 mt-3">
                <div className="flex  gap-1 pb-4 mt-5">
                  <div className="max-w-[30%]">
                    <img
                      src={related.coverImage}
                      className="w-full h-full"
                      alt="img"
                    />
                    <p className="font-Playfair text-[15px] font-semibold">
                      <Link to={`/post-details/${related.slug}`}>
                        {related.title}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar News */}
        <div className="md:ml-3 mx-2 md:w-[30%] space-y-4">
          {post?.sidebarPosts?.slice(0, 2)?.map((sidebar) => (
            <div key={sidebar._id}>
              <img src={sidebar.coverImage} alt="Img" />
              <p className=" font-bold">
                <Link to={`/post-details/${sidebar.slug}`}>
                  {sidebar.title}
                </Link>
              </p>
              <p className="text-[12px] font-bold">By {post?.author?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
