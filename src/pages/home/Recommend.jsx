import React, { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGetAllBooksQuery } from "../../store/features/bookApi/bookApi";

const Recommend = () => {
  const [books, setBooks] = useState([]);
  const { data, error, isLoading } = useGetAllBooksQuery();

  useEffect(() => {
    if (data) {
      setBooks(data?.data?.books);
    } else [console.log("Error fething books")];
    // fetch("/books.json")
    //   .then((response) => response.json())
    //   .then((data) => setBooks(data))
    //   //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));
  }, [data]);
  return (
    <div className="py-4">
      <h2 className="md:text-xl text-lg font-semibold ">Recommended</h2>

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
          {books.length > 0 &&
            books.slice(8, 18).map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Recommend;
