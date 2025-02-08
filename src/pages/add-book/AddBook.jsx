import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    description: "",
    category: "",
    trending: false,
    oldPrice: "",
    newPrice: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [pdfBook, setPdfBook] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookData({
      ...bookData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (e.target.name === "coverImage") {
      setCoverImage(file);
      // Generate preview for image
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (e.target.name === "pdfBook") {
      setPdfBook(file);
    }
  };

  const uploadToCloudinary = async (file, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bookestore");
    formData.append("folder", folder);

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dmx22dkwy/upload",
      formData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const toastId = toast.loading("Adding book...");

    try {
      // Upload cover image with progress toast
      let coverImageUrl = "";
      if (coverImage) {
        // toast.loading("Uploading cover image...", { id: "cover-upload" });
        coverImageUrl = await uploadToCloudinary(coverImage, "book_covers");
        // toast.success("Cover image uploaded!", { id: "cover-upload" });
      }

      // Upload PDF with progress toast
      let pdfBookUrl = "";
      if (pdfBook) {
        // toast.loading("Uploading PDF file...", { id: "pdf-upload" });
        pdfBookUrl = await uploadToCloudinary(pdfBook, "book_pdfs");
        // toast.success("PDF file uploaded!", { id: "pdf-upload" });
      }

      const newBook = {
        ...bookData,
        coverImage: coverImageUrl,
        pdfBook: pdfBookUrl,
      };

      // Send data to backend
      await axios.post("http://localhost:5000/api/books/create-book", newBook);

      toast.success("Book added successfully!", { id: toastId });

      // Reset form
      setBookData({
        title: "",
        description: "",
        category: "",
        trending: false,
        oldPrice: "",
        newPrice: "",
      });
      setCoverImage(null);
      setPdfBook(null);
      setCoverPreview(null);
    } catch (error) {
      console.error("Error uploading book:", error);
      toast.error("Failed to upload book.", { id: toastId });
    }

    setUploading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* ... (keep existing form fields the same) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter book title"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={bookData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter book description"
            />
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={bookData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter book category"
            />
          </div>

          {/* Price Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Old Price ($)
              </label>
              <input
                type="number"
                name="oldPrice"
                value={bookData.oldPrice}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter original price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Price ($)
              </label>
              <input
                type="number"
                name="newPrice"
                value={bookData.newPrice}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter discounted price"
              />
            </div>
          </div>

          {/* Trending Checkbox */}
          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              name="trending"
              checked={bookData.trending}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Mark as Trending
            </label>
          </div>
          {/* File Uploads */}
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition overflow-hidden">
                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">
                      {coverImage
                        ? coverImage.name
                        : "Click to upload cover image"}
                    </span>
                  )}
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                  <span className="text-gray-500">
                    {pdfBook ? pdfBook.name : "Click to upload PDF file"}
                  </span>
                  <input
                    type="file"
                    name="pdfBook"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {uploading ? "Uploading..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
