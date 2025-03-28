import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const NewsSection = ({ post, flexReverse }) => {
  return (
    <div className="md:w-10/12 mx-auto pb-10">
      {/* Category Title */}
      <Link
        to={`/all-posts/${encodeURIComponent(post?.category?.name)}`}
        className="flex gap-3 items-center border-b border-black my-5 py-4 font-siliguri"
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
          {/* Main News */}
          <Link to={`/post-details/${post.slug}`}>
            <img
              src={post.coverImage}
              alt=""
              className="w-full h-auto object-cover border"
            />
            <div className="py-5 space-y-2">
              <p className="font-Playfair font-semibold text-2xl text-center hover:underline">
                <Link to={`/post-details/${post.slug}`}>{post?.title}</Link>
              </p>
              <p className="text-center text-[12px] font-bold">
                By {post?.author?.name}
              </p>
            </div>
          </Link>

          {/* Related News */}
          <div className="md:flex border-t">
            {post.relatedPosts?.slice(0, 2).map((related) => (
              <Link
                to={`/post-details/${related.slug}`}
                key={related._id}
                className="md:border-r mr-3 mt-3"
              >
                <div className="flex flex-row-reverse  pb-4 mt-5 items-center gap-2">
                  <div className="w-[70%]">
                    <p className="font-Playfair text-[15px] font-semibold">
                      <Link to={`/post-details/${related.slug}`}>
                        {related.title}
                      </Link>
                    </p>
                  </div>
                  <div className="w-[30%]">
                    <img
                      src={related.coverImage}
                      className="w-full h-auto object-cover"
                      alt="Image"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar News */}
        <div className="md:ml-3 mx-2 md:w-[30%] space-y-4">
          {post?.sidebarPosts?.slice(0, 2)?.map((sidebar) => (
            <Link to={`/post-details/${sidebar.slug}`} key={sidebar._id} className="mb-5 block">
              <img
                src={sidebar.coverImage}
                className="w-full h-auto object-cover"
                alt="Img"
              />
              <p className=" font-bold">
                <Link to={`/post-details/${sidebar.slug}`}>
                  {sidebar.title}
                </Link>
              </p>
              <p className="text-[12px] font-bold">By {post?.author?.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
