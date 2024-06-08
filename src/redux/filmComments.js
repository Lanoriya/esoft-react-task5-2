import { createSlice } from '@reduxjs/toolkit';

const filmComments = createSlice({
  name: 'filmComments',
  initialState: {}, // Изменяем начальное состояние на объект
  reducers: {
    addComment: (state, action) => {
      const { filmId, comment } = action.payload;
      // Проверяем, существует ли уже массив комментариев для данного фильма
      if (!state[filmId]) {
        // Если нет, создаем новый массив комментариев
        state[filmId] = [comment];
      } else {
        // Если есть, добавляем новый комментарий в существующий массив
        state[filmId].push(comment);
      }
    }
  }
});

export const { addComment } = filmComments.actions;

export default filmComments.reducer;
