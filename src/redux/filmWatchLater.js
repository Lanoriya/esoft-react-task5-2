import { createSlice } from '@reduxjs/toolkit';

const filmWatchLaterSlice = createSlice({
  name: 'filmLater',
  initialState: [],
  reducers: {
    setLater: (state, action) => {
      const filmId = action.payload;
      const index = state.indexOf(filmId);
      if (index === -1) {
        state.push(filmId); // Добавляем фильм в список просмотра позже, если его еще нет
      } else {
        state.splice(index, 1); // Удаляем фильм из списка просмотра позже, если он уже есть
      }
    }
  }
});

export const { setLater } = filmWatchLaterSlice.actions;

export default filmWatchLaterSlice.reducer;
