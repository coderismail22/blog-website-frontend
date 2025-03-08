/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Add types here
import { Link } from "react-router-dom";

const SimilarPostsManual = ({ similarPosts }: any) => {
  return (
    <div>
      {similarPosts?.length > 0 && (
        <div>
          <p className="border-y text-center text-sm uppercase font-bold">
            You may also explore
          </p>
          <div className="flex border-5 items-center justify-center">
            {similarPosts?.slice(0, 3).map((similarPost: any) => (
              <div key={similarPost._id} className="md:border-r mr-3 mt-3">
                <div className="gap-1 pb-4 mt-5">
                  <div className="w-full">
                    <img
                      src={similarPost.coverImage}
                      className="w-20 h-20 object-cover object-center"
                      alt="Image"
                    />
                  </div>
                  <div className="w-[70%]">
                    <p className="text-[12px] font-semibold">
                      <Link to={`/post-details/${similarPost.slug}`}>
                        {similarPost.title}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarPostsManual;
