import banner from "/default.jpg";
import { Link } from "react-router-dom";
import { subNewsData } from "../BreakingNews/DB";
import { Tabs } from "antd";
import { FaRegBookmark } from "react-icons/fa";
// trending
const items = [
  {
    key: "1",
    label: <span className="font-semibold text-lg text-red-600">Trending</span>,
    children: (
      <div className="mt-4">
        {[
          "Physical Attacks Against Bitcoin Holders Surge As BTC Price Rises",
          "New Guns, More Ammo: Ukraine’s Artillery Blasts Away At A Rate Of...",
          "The Real Reasons Companies Are Forcing You Back To The Office",
          "The Highest-Paid Actors Of 2024",
          "The Real Reasons Companies Are Forcing You Back To The Office",
          "The Highest-Paid Actors Of 2024",
          "The Real Reasons Companies Are Forcing You Back To The Office",
          "The Highest-Paid Actors Of 2024",
          "4 Reasons Behind ‘Phantom Plus-One’ Relationships—By A Psychologist",
          "A Hapless Russian Soldier Couldn’t Shoot Down A Ukrainian Bomber Dron...",
        ].map((title, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-3 py-3 border-b"
          >
            <div className="flex gap-4">
              <div className="">
                <span className="text-red-600 font-semibold text-4xl font-Playfair">
                  {index + 1}.
                </span>
              </div>
              <div>
                <p className="text-black font-semibold">{title}</p>
                <p className="text-gray-500 text-sm">
                  By{" "}
                  <span className="text-blue-600 font-medium">Author Name</span>
                  , Contributor
                </p>
              </div>
            </div>
            <div className="">
              <FaRegBookmark className="text-2xl text-blue-600" />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  //   {
  //     key: "2",
  //     label: (
  //       <span className="font-semibold text-lg text-gray-500">
  //         Editors' Picks
  //       </span>
  //     ),
  //     children: (
  //       <div className="mt-4">
  //         {[
  //           "Physical Attacks Against Bitcoin Holders Surge As BTC Price Rises",
  //           "New Guns, More Ammo: Ukraine’s Artillery Blasts Away At A Rate Of...",
  //           "The Real Reasons Companies Are Forcing You Back To The Office",

  //           "The Highest-Paid Actors Of 2024",
  //           "4 Reasons Behind ‘Phantom Plus-One’ Relationships—By A Psychologist",
  //           "A Hapless Russian Soldier Couldn’t Shoot Down A Ukrainian Bomber Dron...",
  //         ].map((title, index) => (
  //           <div
  //             key={index}
  //             className="flex justify-between items-center gap-3 py-3 border-b"
  //           >
  //             <div className="flex gap-4">
  //               <div className="">
  //                 <span className="text-red-600 font-semibold text-4xl font-Playfair">
  //                   {index + 1}.
  //                 </span>
  //               </div>
  //               <div>
  //                 <p className="text-black font-semibold">{title}</p>
  //                 <p className="text-gray-500 text-sm">
  //                   By{" "}
  //                   <span className="text-blue-600 font-medium">Author Name</span>
  //                   , Contributor
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="">
  //               <FaRegBookmark className="text-2xl text-blue-600" />
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ),
  //   },
];
const Banner = ({ trendingData }) => {
  return (
    <div className="md:w-10/12 mx-auto px-2  ">
      <div className="md:flex mt-10">
        <div className="md:w-[70%] md:pr-4 border-r">
          {/* main news  */}
          <div className="">
            <img
              src={banner}
              alt=""
              className="w-full transition delay-300 duration-200 flex flex-col items-center justify-center"
            />
            <div className="py-5 space-y-2">
              <p className="font-Playfair font-semibold text-2xl text-center hover:underline">
                <Link to={"/news-details"}>
                  The Billionaire Robert Kuok’s Grandson Drives $10 Billion Bet
                  On AI Data Centers
                </Link>
              </p>
              <p className="text-center text-[12px]">
                By Jonathan Burgos, Forbes Staff
              </p>
              <p className="text-center">
                Kuok Meng Wei, whose grandfather was once called the world’s
                shrewdest businessman by Forbes, is leading his family into what
                the 41-year-old describes as the hottest industry in decades.
              </p>
            </div>
          </div>

          {/* sub news  */}
          <div className="grid md:grid-cols-2 gap-2 border-t py-10">
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
          </div>
          {/* quote of the day  */}
          <div className="border border-[#EAE4C8] p-6 rounded-lg text-center max-w-3xl mx-auto shadow-sm">
            <div className="relative">
              <h2 className="uppercase text-gray-500 text-sm tracking-wide before:content-[''] before:absolute before:w-16 before:h-[2px] before:bg-[#EAE4C8] before:left-0 before:top-1/2 after:content-[''] after:absolute after:w-16 after:h-[2px] after:bg-[#EAE4C8] after:right-0 after:top-1/2">
                Quote of the Day
              </h2>
            </div>
            <p className="text-center font-Playfair text-xl font-semibold mt-4">
              “Coaching isn’t social work, but it’s more than just a game—it’s a
              heartfelt vocation, in which you are powerfully bonded to students
              who need you.”
            </p>
            <p className="font-semibold mt-3">
              <span className="text-black">Pat Summitt</span>, Coach and Athlete
            </p>
          </div>
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
