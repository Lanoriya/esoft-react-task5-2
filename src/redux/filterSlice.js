import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFilter: "По типу"
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.selectedFilter = action.payload;
    }
  }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
