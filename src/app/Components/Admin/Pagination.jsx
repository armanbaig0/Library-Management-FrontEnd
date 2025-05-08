import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaginationUI = ({ books, setBooks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (book) => {
    try {
      const response = await axios.delete('http://localhost:5000/admin/del-book', {
        data: {
          book_id: book.book_id,
          book_name: book.book_name,
          book_author: book.book_author,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        const updatedBooks = books.filter((b) => b.book_id !== book.book_id);
        setBooks(updatedBooks);
        await Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Book Deleted Successfully',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert(
        error.response?.data?.msg || 'An error occurred while deleting the book.'
      );
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="px-2 rounded shadow w-full">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Book Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Book Path</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No books available.
                </td>
              </tr>
            ) : (
              currentBooks.map((book, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{book.book_name}</td>
                  <td className="px-4 py-2">{book.book_author}</td>
                  <td className="px-4 py-2 break-all">{book.book_path}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className=" text-white py-1 px-3 rounded-md cursor-pointer"
                      onClick={() => handleDelete(book)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" 
                      className='h-5 w-3'
                      viewBox="0 0 448 512">
                      <path  d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                      </svg>

                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-sm font-medium text-gray-700 mx-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationUI;
