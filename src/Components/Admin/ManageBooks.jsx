"use client";
import { useState, useEffect } from 'react';
import PaginationUI from './Pagination';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageBooks = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [bookfile, setBookFile] = useState('');
  const [books, setBooks] = useState([]);

  // Fetch books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://library-management-rqkq.onrender.com/student/get-books'); 
        if (response.data.success) {
          setBooks(response.data.books);
        } else {
          alert('Failed to fetch books');
        }
      } catch (error) {
         console.log("Error fetching books")
      }
    };

    fetchBooks();
  }, []);

  // Handle adding a new book
  const handleAddBook = async () => {
   
    if (bookName.trim() !== '' && authorName.trim() !== '' && bookfile) {
      try {
        const formData = new FormData();
        formData.append('book_name', bookName);
        formData.append('book_author', authorName);
        formData.append('pdf', bookfile);

        const response = await axios.post('https://library-management-rqkq.onrender.com/admin/add-books', formData, {
          headers:{
            'Content-Type' : 'multipart/form-data',
          },
        });

        if (response.data.success) {
          // Update the state with the newly added book
          setBooks([...books, response.data.book]);
          setBookName('');
          setAuthorName('');
          setBookFile('');

          document.getElementById("fileinput").value = "";

          await Swal.fire({
            toast: true,
            position: 'top-end',    // top-right corner
            icon: 'success',
            title: `File "${bookfile}" added`,
            showConfirmButton: false,
            timer: 2000,            // 1 seconds
            timerProgressBar: true, // green line animation

            
    });
        } else {
          alert(response.data.msg || 'Error adding book');
        }
      } catch (error) {
        alert('Failed to add book. Please try again later.');
      }
    }
  };

  return (
    <>
      {/* Add Book Section */}
      <div className="p-4 bg-white rounded shadow items-center mb-4">
        <h3 className="text-lg font-bold mb-2">Add Books!</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Book Name"
          />
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Author Name"
          />
          <input
            type="file"
            name='file'
            id='fileinput'
            accept='.pdf'
            onChange={(e) => setBookFile(e.target.files[0])}
            className="border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Select File"
          />
          <button
            type="button"
            onClick={handleAddBook}
            className="w-[50px] bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
          >
            Add
          </button>
        </div>
      </div>

      {/* Manage Books List Section */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-bold mb-2">Manage Books</h3>
        <div>
          <PaginationUI books={books} setBooks={setBooks} />
        </div>
      </div>
    </>
  );
};

export default ManageBooks;
