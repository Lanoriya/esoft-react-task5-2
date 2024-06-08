import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFavorite } from '../../redux/filmFavorite';
import { setLater } from '../../redux/filmWatchLater';

export function FilmsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const films = useSelector(state => state.films);
  const selectedOption = useSelector(state => state.filter.selectedFilter);
  const favoriteFilms = useSelector(state => state.filmFavorite);
  const laterFilms = useSelector(state => state.filmLater);

  const handleFilmClick = (film) => {
    navigate(`/film/${film}`);
  };

  const filteredFilms = useMemo(() => {
    switch (selectedOption) {
      case "По типу":
        return films.slice().sort((a, b) => (a.type || '').localeCompare(b.type || ''));
      case "По рейтингу (от больших к меньшим)":
        return films.slice().sort((a, b) => b.rating - a.rating);
      case "По рейтингу (от меньшим к большим)":
        return films.slice().sort((a, b) => a.rating - b.rating);
      default:
        return films;
    }
  }, [films, selectedOption]);

  if (!filteredFilms || filteredFilms.length === 0) {
    return <div>Загрузка...</div>;
  }

  const handleAddToFavorites = (movieId) => {
    dispatch(setFavorite(movieId));
  };

  const handleAddToWatchLater = (movieId) => {
    dispatch(setLater(movieId));
  };

  return (
    <div className="films-container flex flex-col gap-8">
      {filteredFilms.map((film) => {
        const isFavoriteFilm = favoriteFilms.includes(film.id);
        const isLaterFilm = laterFilms.includes(film.id);

        return (
          <div
            key={film.id}
            className="film-item cursor-pointer flex flex-col rounded-lg bg-[#181a1b] text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:max-w-xl md:flex-row"
          >
            <img
              onClick={() => { handleFilmClick(film.id) }}
              className="film-logo h-96 w-80 rounded-t-lg mx-auto object-cover md:h-auto md:w-36 md:!rounded-none md:!rounded-s-lg hover:opacity-70"
              src={film.image}
              alt={film.title}
            />
            <div className="film-about flex flex-col justify-start p-6 hover:opacity-70" onClick={() => { handleFilmClick(film.id) }} style={{ width: '100%' }}>
              <h5 className="text-3xl font-bold mb-4">{film.title}</h5>
              <h3 className="mb-2 text-xl font-medium">{film.type}</h3>
              <p className="mb-4 text-base">{film.short_description}</p>
              <p className="text-xs text-surface/75 dark:text-neutral-300">{film.genres.join(', ')}</p>
              <p className="text-xs text-surface/75 dark:text-neutral-300">{film.actors.join(', ')}</p>
              <p className="text-xs text-surface/75 dark:text-neutral-300">{film.rating}/10</p>
            </div>
            <div className="film-buttons flex text-xs text-surface/75 dark:text-neutral-300 last gap-1 self-end p-2">{''}
              <button className="text-primary [&amp;>svg]:h-5 [&amp;>svg]:w-5" title="Excellent" data-twe-rating-icon-ref="" onClick={() => { handleAddToFavorites(film.id) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={isFavoriteFilm ? '#fff' : 'none'} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
                </svg>
              </button>
              <button className="text-primary [&amp;>svg]:h-5 [&amp;>svg]:w-5" title="Excellent" data-twe-rating-icon-ref="" onClick={() => { handleAddToWatchLater(film.id) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={isLaterFilm ? '#9c71c6' : 'none'} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
