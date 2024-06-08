import { createSlice } from '@reduxjs/toolkit';

const filmSlice = createSlice({
  name: 'films',
  initialState: [],
  reducers: {
    setFilms: (state, action) => {
      return action.payload;
    }
  }
});

export const { setFilms } = filmSlice.actions;
export default filmSlice.reducer;
