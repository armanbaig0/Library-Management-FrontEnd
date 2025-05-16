import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';




export const addBookThunk = createAsyncThunk("apidata", async () => {
    const response = await fetch('http://localhost:5000/student/get-books');
    return response.json();
})

// // Add book async thunk
// export const addBookThunk = createAsyncThunk(
//   'addBooks/addBookThunk',
//   async (bookData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append('book_name', bookData.book_name);
//       formData.append('book_author', bookData.book_author);
//       formData.append('pdf', bookData.pdf);

//       const response = await axios.post('http://localhost:5000/admin/add-books', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         return response.data.book;
//       } else {
//         return rejectWithValue('Failed to add book');
//       }
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// Slice reducer
const addBookSlice = createSlice({
  name: 'addBooks',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    delBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBookThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(addBookThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { addBook, delBook } = addBookSlice.actions;
export default addBookSlice.reducer;
