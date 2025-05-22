

// // Fetch books
// export const fetchBooksThunk = createAsyncThunk(
//   'addBooks/fetchBooksThunk',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('http://localhost:5000/student/get-books');
//       if (response.data.success) {
//         return response.data.books;
//       } else {
//         return rejectWithValue('Failed to fetch books');
//       }
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );


// .addCase(addBookThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addBookThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.books.push(action.payload);
//       })
//       .addCase(addBookThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });