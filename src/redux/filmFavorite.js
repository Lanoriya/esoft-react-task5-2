import { createSlice } from '@reduxjs/toolkit';

const filmFavoriteSlice = createSlice({
  name: 'filmFavorite',
  initialState: [],
  reducers: {
    setFavorite: (state, action) => {
      const filmId = action.payload;
      const index = state.indexOf(filmId);
      if (index === -1) {
        state.push(filmId); // Добавляем фильм в избранное, если его еще нет
      } else {
        state.splice(index, 1); // Удаляем фильм из избранного, если он уже есть
      }
    }
  }
});

export const { setFavorite } = filmFavoriteSlice.actions;

export default filmFavoriteSlice.reducer;
