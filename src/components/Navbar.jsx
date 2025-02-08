import React, { useEffect, useState } from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import Avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useGetAllBooksQuery } from "../store/features/bookApi/bookApi";

const navigations = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
];

const Navbar = () => {
  const { data, error, isLoading } = useGetAllBooksQuery();
  const [books, setBooks] = useState([]);

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

  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log(cartItems);
  const currentUser = true;
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <header className="max-w-5xl mx-auto px-4 py-6">
      <nav className="flex items-center justify-between gap-4">
        {/* left */}
        <div className="flex items-center md:gap-10 gap-2 ">
          <Link to={"/"}>
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>
          <div className="flex items-center gap-1 py-1 md:w-[300px]  bg-gray-200 rounded-md ">
            <CiSearch className="size-6 px-1" />
            <input
              type="text"
              placeholder="Search.."
              className="bg-transparent w-full inline-block text-sm focus:outline-none "
            />
          </div>
        </div>
        {/* 
            right */}
        <div className="flex items-center md:gap-8 gap-4">
          {currentUser ? (
            <>
              <button
                className="ring-2 ring-blue-500 rounded-full"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img src={Avatar} alt="avatar" />
              </button>
              {/* shoq dropdown here */}
              {showDropdown && (
                <ul className="absolute  top-16 border  p-2 w-[120px] z-30 bg-white rounded-md shadow-md">
                  {navigations.map((nav, idx) => (
                    <li
                      className="py-1 text-sm hover:bg-gray-100 px-1 rounded-sm cursor-pointer"
                      key={idx}
                    >
                      <Link to={nav.href}>{nav.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <FaRegUser className="size-5" />
              </Link>
            </>
          )}

          <Link to={"/favorites"}>
            <FaRegHeart className="size-5" />
          </Link>
          <Link
            className="flex items-center gap-1 bg-primary rounded-sm px-2 py-1"
            to={"/cart"}
          >
            <IoCartOutline className="size-5" />
            {cartItems?.length < 0 ? (
              <span>0</span>
            ) : (
              <span>{cartItems?.length}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
