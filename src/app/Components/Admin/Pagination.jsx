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
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md cursor-pointer"
                      onClick={() => handleDelete(book)}
                    >
                      Delete
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
