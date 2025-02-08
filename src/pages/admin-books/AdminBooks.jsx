import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
} from "../../store/features/bookApi/bookApi";
import toast from "react-hot-toast";

const AdminBooks = () => {
  const { data, error, isLoading, refetch } = useGetAllBooksQuery(); // Add refetch function
  const [deleteBook] = useDeleteBookMutation();

  const [books, setBooks] = useState([]);
  const [currentBooks, setCurrentBooks] = useState([]);

  useEffect(() => {
    if (data) {
      setBooks(data?.data?.books);
      setCurrentBooks(books.slice(0, 9));
    } else {
      console.log("Error fetching books");
    }
  }, [data]);

  const handleDelete = async (bookId) => {
    const toastId = toast.loading("Deleting Book...");
    try {
      await deleteBook(bookId).unwrap();
      toast.success("Book Deleted Successfully", { id: toastId });

      refetch(); // 🔄 TRIGGER REFETCH TO GET LATEST DATA
    } catch (error) {
      toast.error("Failed to delete the book", { id: toastId });
      console.error("Failed to delete the book: ", error);
    }
  };

  return (
    <>
      {books.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 flex items-center justify-end"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((item) => (
                <tr
                  key={item._id}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4">{item.category.toUpperCase()}</td>
                  <td className="px-6 py-4">${item.newPrice}</td>
                  <td className="px-6 py-4 flex items-center justify-end">
                    <span
                      onClick={() => handleDelete(item._id)}
                      className="cursor-pointer"
                    >
                      <FaTrash className="text-red-500" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="w-full my-4 p-2 text-gray-500">No Book here</p>
      )}
    </>
  );
};

export default AdminBooks;
