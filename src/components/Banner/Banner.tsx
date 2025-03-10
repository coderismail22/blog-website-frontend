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
                className="max-w-full  overflow-hidden transition delay-300 duration-200 flex flex-col items-center justify-center mx-auto"
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

          {/* sub news  */}
          {/* <div className="grid md:grid-cols-2 gap-2 border-t py-10">
            {subNewsData?.map((item) => (
              <div key={item?.id} className="">
                <img
                  src={item?.image}
                  alt=""
                  className="h-72 w-full object-cover"
                />
                <p className="font-Playfair text-xl font-semibold">
                  {item?.title}
                </p>
              </div>
            ))}
          </div> */}
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
