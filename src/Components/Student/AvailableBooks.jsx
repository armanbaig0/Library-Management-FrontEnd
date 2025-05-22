import { useState, useEffect } from 'react';
import React from 'react';
import PaginationUI from '../Student/Pagination';
import axios from 'axios';
import Swal from 'sweetalert2';

const AvailableBooks = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [books, setBooks] = useState([]);

  // Fetch API for showing books from the database
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/get-books');
        if (response.data.success) {
          setBooks(response.data.books);
        } else {
          await Swal.fire({
            position: 'top-end',    // top-right corner
            icon: 'success',
            title: 'Currently no books Available',
            showConfirmButton: false,
            timer: 2000,            // 5 seconds
            timerProgressBar: true, // green line animation
          });
        }
      } catch (error) {
        console.log('Error fetching books');
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-bold mb-2">Available Books</h3>
        {/* Pass Requests state as a prop to PaginationUI */}
        <PaginationUI books={books} />
      </div>
    </>
  );
};

export default AvailableBooks;
