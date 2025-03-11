/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Add types here
import { Link } from "react-router-dom";

const SimilarPostsAutomatic = ({ similarPosts }: any) => {
  return (
    <div>
          <div className="border border-[#EAE4C8] p-2 rounded-lg text-center max-w-3xl mx-auto shadow-sm">
            <div className="relative">
              <h2 className="uppercase text-gray-500 text-sm tracking-wide before:content-[''] before:absolute before:w-16 before:h-[2px] before:bg-[#EAE4C8] before:left-0 before:top-1/2 after:content-[''] after:absolute after:w-16 after:h-[2px] after:bg-[#EAE4C8] after:right-0 after:top-1/2">
                You may also explore
                {/* Quote of the Day */}
              </h2>
            </div>
          </div>
      {similarPosts?.length > 0 && (
        <div>
          <div className="flex flex-wrap justify-center gap-4">
            {similarPosts?.slice(0, 3).map((similarPost: any) => (
              <div
                key={similarPost._id}
                className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-36"
              >
                <div className="w-full mb-3">
                  <img
                    src={similarPost.coverImage}
                    className="w-16 h-16 object-cover object-center rounded-md mx-auto"
                    alt={similarPost.title || "Image"}
                  />
                </div>
                <div className="w-full text-center">
                  <p className="text-xs font-semibold  max-w-[150px]">
                    <Link
                      to={`/post-details/${similarPost.slug}`}
                      className="hover:text-blue-600"
                    >
                      {similarPost.title}
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarPostsAutomatic;
