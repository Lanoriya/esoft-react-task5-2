import { configureStore } from '@reduxjs/toolkit';
import filmReducer from './filmSlice';
import filterReducer from './filterSlice';
import filmFavoriteReducer from './filmFavorite';
import filmWatchLaterReducer from './filmWatchLater';
import filmCommentsReducer from './filmComments';

export default configureStore({
  reducer: {
    films: filmReducer,
    filter: filterReducer,
    filmFavorite: filmFavoriteReducer,
    filmLater: filmWatchLaterReducer,
    filmComments: filmCommentsReducer,
  },
})