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

const options = [
  "Choose a genre",
  "Horror",
  "Fiction",
  "Business",
  "Adventure",
];

const TopSeller = () => {
  const { data, error, isLoading } = useGetAllBooksQuery();

  const [books, setBooks] = useState([]);
  //   const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  useEffect(() => {
    if (data) {
      setBooks(data?.data?.books);
      // console.log(data?.data?.books);
    } else [console.log("Error fething books")];
    // fetch("/books.json")
    //   .then((response) => response.json())
    //   .then((data) => setBooks(data))
    //   //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));
  }, [data]);

  //filetr book
  const filteredBooks =
    selectedCategory == "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category == selectedCategory?.toLowerCase()
        );
  return (
    <div className="py-16">
      <h2 className="md:text-xl text-lg font-semibold mb-2">Top Sellers</h2>
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border-2  border-black/30 rounded-md p-1"
        name="category"
        id="category"
      >
        {options.map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}
      </select>
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
          {filteredBooks.length > 0 &&
            filteredBooks.map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopSeller;

// const [books, setBooks] = useState([]);

// useEffect(() => {
//   fetch;
// }, []);
