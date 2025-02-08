import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../../store/features/bookApi/bookApi";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/features/Cart/cart";

const SingleBook = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetBookByIdQuery(id);
  const [book, setBook] = useState(null);

  const dispatch = useDispatch();
  const handleClick = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    if (data?.data?.book) {
      setBook(data.data.book);
    }
  }, [data]);

  if (error)
    return (
      <p className="text-center text-lg text-red-500">
        Error fetching book details.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Image Section */}
        <div className="w-full sm:w-1/3 flex justify-center">
          {isLoading ? (
            <div className="w-full sm:w-60 h-72 bg-gray-200 rounded-md animate-pulse"></div>
          ) : (
            <img
              src={book?.coverImage}
              alt={book?.title || "Book Cover"}
              className="w-full sm:w-60 h-auto object-cover rounded-md shadow-md"
            />
          )}
        </div>

        {/* Details Section */}
        <div className="w-full sm:w-2/3">
          {isLoading ? (
            <>
              <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mt-3"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded-md animate-pulse mt-2"></div>
              <div className="h-5 w-1/3 bg-gray-200 rounded-md animate-pulse mt-4"></div>
              <div className="h-10 w-40 bg-gray-300 rounded-md animate-pulse mt-5"></div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold text-gray-800">
                {book?.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
                {book?.description}
              </p>

              {/* Price Section */}
              <p className="mt-4 text-lg font-medium text-gray-900">
                ${book?.newPrice}
                {book?.oldPrice && (
                  <span className="text-gray-500 line-through ml-2 text-base">
                    ${book.oldPrice}
                  </span>
                )}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleClick(book)}
                className="mt-5 flex items-center gap-2 px-5 py-2 bg-primary text-black font-medium rounded-md transition"
              >
                <FiShoppingCart />
                <span>Add to Cart</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
