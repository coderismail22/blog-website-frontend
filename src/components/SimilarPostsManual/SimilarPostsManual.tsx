/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Add types here
import { Link } from "react-router-dom";

const SimilarPostsManual = ({ similarPosts }: any) => {
  return (
    <div>
      {similarPosts?.length > 0 && (
        <div>
          <div className="border border-[#EAE4C8] p-2 rounded-lg text-center max-w-3xl mx-auto shadow-sm">
            <div className="relative">
              <h2 className="uppercase text-gray-500 text-sm tracking-wide before:content-[''] before:absolute before:w-16 before:h-[2px] before:bg-[#EAE4C8] before:left-0 before:top-1/2 after:content-[''] after:absolute after:w-16 after:h-[2px] after:bg-[#EAE4C8] after:right-0 after:top-1/2">
                Suggested {/* Quote of the Day */}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
            {similarPosts?.slice(0, 3).map((similarPost: any) => (
              <div
                key={similarPost._id}
                className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Link
                  to={`/post-details/${similarPost.slug}`}
                  className="flex flex-col h-full"
                >
                  {/* Image Section */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={similarPost.coverImage}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-md"
                      alt={similarPost.title || "Post Image"}
                    />
                  </div>

                  {/* Title Section */}
                  <div className="flex flex-col items-center">
                    <p className="text-sm md:text-base font-semibold text-center overflow-hidden text-ellipsis  max-w-[300px] ">
                      {similarPost.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarPostsManual;
