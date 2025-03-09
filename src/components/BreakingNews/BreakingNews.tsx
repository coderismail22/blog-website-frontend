// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BreakingNewsData } from "./DB";

const BreakingNews = () => {
  return (
    <div className="border-b py-3">
      <div className="w-[90%] mx-auto relative ">
        {/* Custom Navigation Buttons */}
        <button className="custom-prev absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-200 text-white p-2 rounded-full  hover:bg-red-600">
          <FaArrowLeft />
        </button>
        <button className="custom-next absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-200 text-white p-2 rounded-full  hover:bg-red-600">
          <FaArrowRight />
        </button>

        <Swiper
          slidesPerView={4}
          autoHeight={true}
          spaceBetween={10}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Navigation, Pagination]}
          className="custom-swiper"
        >
          {BreakingNewsData?.map((item) => (
            <SwiperSlide key={item?.id}>
              <div className="p-4 border-r">
                <p className="text-gray-500 text-[12px]">{item?.time}</p>
                <p className="text-[15px] font-semibold font-Playfair">
                  {item?.title?.slice(0, 50)}...
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BreakingNews;
