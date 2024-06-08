import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FilmComments from "../FilmComments/FilmComments";
import { Link } from 'react-router-dom';

export function DetailsPage() {
  const { id } = useParams();
  const film = useSelector(state => state.films.find(film => film.id === +id));
  const allFilms = useSelector(state => state.films);

  if (!film) {
    return <div>Загрузка...</div>
  }

  const similarFilms = allFilms.filter((f) => {
    if (f.id === film.id) {
      return false;
    }

    // Подсчет количества совпадающих жанров
    const commonGenres = f.genres.filter(genre => film.genres.includes(genre));

    // Условие для фильтрации
    let condition = false;

    if (film.genres.length === 1) {
      // Если у текущего фильма один жанр, то фильтруем по фильмам с одинаковым жанром
      condition = commonGenres.length === 1;
    } else {
      // Если у текущего фильма более одного жанра, то фильтруем по фильмам с двумя общими жанрами
      condition = commonGenres.length >= 2;
    }

    return condition;
  });

  return (
    <>
      <Link className="inline-block m-4 rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong" to='/'>
        Главная
      </Link>
      <img
        className="film-logo-details h-96 w-80 mx-auto object-cover md:h-auto md:w-36 md:!rounded-none"
        src={film.image}
        alt={film.title}
      />
      <h2>{film.title}</h2>
      <p>{film.rating}</p>
      <p>{film.actors.join(', ')}</p>
      <p>{film.full_description}</p>
      <p>{film.genres.join(', ')}</p>
      <h2 className="text-xl mt-8">Похожие фильмы:</h2>
      <div className="similarFilms flex gap-8 flex-wrap">
        {similarFilms.map((similarFilm) => (
          <Link className="w-1/4 text-center" to={`/film/${similarFilm.id}`} key={similarFilm.id}>
            <div className="flex flex-col similarFilms-item items-center" key={similarFilm.id}>
              <img
                className="film-logo h-60 w-48"
                src={similarFilm.image}
                alt={similarFilm.title}
              />
              <div className="similarFilms-about">
                <h4 className="text-xl">{similarFilm.title}</h4>
                <p>{similarFilm.genres.join(', ')}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <FilmComments filmId={+id}/>
    </>
  )
}