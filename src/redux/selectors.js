import { createSelector } from 'reselect';

const selectFilmComments = state => state.filmComments;

export const selectCommentsForFilm = createSelector(
  [selectFilmComments, (_, filmId) => filmId],
  (filmComments, filmId) => {
    // Проверка, существует ли filmComments[filmId], и возврат его или пустой массив, если его нет
    return filmComments[filmId] || [];
  }
);
