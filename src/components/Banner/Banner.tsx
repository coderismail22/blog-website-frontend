import { Link } from "react-router-dom";
import { Tabs } from "antd";
import QuoteOfTheDay from "../QuoteOfTheDay/QuoteOfTheDay";

const Banner = ({ trendingData, latestFeaturedPost }) => {
  return (
    <div className="md:w-10/12 mx-auto px-2  ">
      <div className="md:flex mt-10">
        <div className="md:w-[70%] md:pr-4 border-r">
          {/* main news + latest featured post  */}
          {latestFeaturedPost && (
            <div>
              <img
                src={latestFeaturedPost?.coverImage}
                alt="Image"
                className="w-full h-auto object-cover mx-auto transition duration-300 ease-in-out"
              />
              <div className="py-5 space-y-2">
                <p className="font-Playfair font-semibold text-2xl text-center hover:underline">
                  <Link to={`/post-details/${latestFeaturedPost?.slug}`}>
                    {latestFeaturedPost?.title}
                  </Link>
                </p>
                <p className="text-center text-[12px]">
                  By {latestFeaturedPost?.author?.name}
                </p>
              </div>
            </div>
          )}

          {/* Quote of the day */}
          <QuoteOfTheDay />
        </div>

        {/* sidebar  */}
        <div className="md:w-[30%] px-3">
          {/* tab section  */}
          {/* Trending */}
          <Tabs
            defaultActiveKey="1"
            items={trendingData}
            // onChange={onChange}
            className="[&_.ant-tabs-nav]:border-b [&_.ant-tabs-tab-active]:text-red-600 [&_.ant-tabs-ink-bar]:bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
