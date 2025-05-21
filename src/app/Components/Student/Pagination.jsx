import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const PaginationUI = ({ books, onBooksUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookRequests, setBookRequests] = useState({});
  const [requestStatuses, setRequestStatuses] = useState([]);
  const booksPerPage = 10;
  const studentName = Cookies.get('userFullname'); // Replace with actual student name from auth

  const totalPages = Math.ceil(books.length / booksPerPage);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handleRequest = async (book_name, book_author) => {
    try {
      const response = await axios.post('http://localhost:5000/student/req-book', {
        student_name: studentName,
        book_name,
        book_author,
      });

      if (response.data.success) {
        setBookRequests((prevRequests) => ({
          ...prevRequests,
          [book_name]: 'pending'
        }));
        await Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Requested Successfully',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
      } else {
        await Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: response.data.msg,
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (error) {
      await Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 2000
      });
    }
  };
  useEffect(() => {
    const fetchRequestStatuses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/request-status', {
          params: { student_name: studentName }
        });
  
        if (response.data.success) {
          const statusMap = {};
          response.data.requests.forEach(req => {
            statusMap[req.book_name] = req.status; // assuming your `book_request` table has a `status` field
          });
          setBookRequests(statusMap);
        } else {
          console.log(response.data.msg);
        }
      } catch (error) {
        console.error('Error fetching request statuses:', error.message);
      }
    };
  
    fetchRequestStatuses();
  }, []);
  

  return (
    <div className="px-2 rounded shadow">
      <div className='flex space-x-4'>
        <table className='w-[55%] table-auto justify items-center'>
          <thead>
            <tr>
              <td className='justify-center items-center w-[15%]'>
                <h3 className="text-md text-center font-bold mb-2">Book Title</h3>
              </td>
              <td className='justify-center items-center w-[15%]'>
                <h3 className="text-md text-center font-bold mb-2">Author</h3>
              </td>
              <td className='justify-center items-center w-[25%]'>
                <h3 className="text-md text-center font-bold mb-2">Book</h3>
              </td>
            </tr>
          </thead>
        </table>
      </div>

      <div className="">
        {currentBooks.length === 0 ? (
          <p className="text-gray-500">No books available.</p>
        ) : (
          currentBooks.map((book, index) => (
            <div key={index} className="flex space-x-8 mb-4">
              <table className="w-[100%] table-auto">
                <thead>
                  <tr className="shadow-md flex">
                    <td className="w-[15%] px-4 py-2">
                      <h4 className="text-gray-800 text-center text-md">{book.book_name}</h4>
                    </td>
                    <td className="w-[15%] px-4 py-2">
                      <h4 className="text-gray-800 text-center text-md">{book.book_author}</h4>
                    </td>
                    <td className="w-[25%] px-4 py-2">
                      <h4 className="text-gray-800 text-center text-md">{book.book_path}</h4>
                    </td>
                    <td className="w-[45%] justify-end items-center flex px-2 py-2">
                      {bookRequests[book.book_name] ? (
                       <span className={`text-md ${
                         bookRequests[book.book_name] === 'pending' ? 'text-yellow-600' : 
                         bookRequests[book.book_name] === 'rejected' ? 'text-red-600' : 'text-green-600'
                      }`}>
                       {bookRequests[book.book_name].charAt(0).toUpperCase() + bookRequests[book.book_name].slice(1)}
                       </span>
                      ) : (
                      <button
                        onClick={() => handleRequest(book.book_name, book.book_author)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-1 px-3 rounded-md mr-2 cursor-pointer hover:scale-105 "
                      >
                      Request
                      </button>
                      )}
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-lg font-medium text-gray-700">
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