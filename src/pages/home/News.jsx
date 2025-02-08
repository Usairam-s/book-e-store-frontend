import React from "react";
import { news } from "../../data/news";
import { getImgUrl } from "../../utils/getImgUrl";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const News = () => {
  return (
    <div className="py-12">
      <h2 className="md:text-xl text-lg font-semibold ">News</h2>

      {/* //book render here */}
      <div className="mt-12">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {/* {
                id: 1,
                title: "Global Climate Summit Calls for Urgent Action",
                description:
                  "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
                image: news1,
              }, */}
          {news.length > 0 &&
            news.map((item, index) => (
              <SwiperSlide key={index}>
                {/* <BookCard book={book} /> */}
                <div className="flex items-center  gap-4">
                  <div className="flex flex-grow flex-col justify-between h-full">
                    <h2 className="font-semibold">{item.title}</h2>
                    <div className="h-1 bg-primary w-20 my-4 " />
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>

                  <img src={item.image} alt="image" />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default News;
