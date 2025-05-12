import { createSlice } from '@reduxjs/toolkit'

const addBookSlice = createSlice({
    name: 'addBooks',
    initialState : [],
    reducers :{
        addBook : (state ,action) =>{
            state.push(action.payload);
        },
        delBook : (state, action) =>{
            return state.filter(book => book.id !== action.payload);
        },
    },
});

export const { addBook, delBook } = addBookSlice.actions;
export default addBookSlice.reducer;