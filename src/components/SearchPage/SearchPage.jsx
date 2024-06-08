import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const films = useSelector(state => state.films);
  const { handleSubmit } = useForm();
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const onSubmit = () => {
    const filteredFilms = films.filter(film => {
      const includesSearchQuery = film.title.toLowerCase().includes(searchQuery.toLowerCase());
      const includesAllSelectedCategories = selectedCategories.length === 0 || selectedCategories.every(category => film.genres.includes(category));
      return includesSearchQuery && includesAllSelectedCategories;
    });
    setSearchResults(filteredFilms);
  };

  return (
    <div className="max-w-lg mx-auto my-8">
      <Link
        to="/"
        className="inline-block m-4 px-6 py-2 bg-neutral-800 rounded text-xs font-medium uppercase text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
      >
        Главная
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-white-700 text-sm font-bold mb-2"
            htmlFor="filmSearch"
          >
            Поиск фильма
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="filmSearch"
            type="text"
            placeholder="Введите название фильма"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <p className="block text-white-700 text-sm font-bold mb-2">
          Выберите категории
        </p>
        <div className="mb-4 flex flex-wrap justify-between">
          {categories.map(category => (
            <label key={category} className="flex w-2/6 items-center text-sm text-white-700 mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-black-600 rounded"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="ml-2">{category}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Поиск
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((film) => (
          <Link to={`/film/${film.id}`} key={film.id} className="block">
            <div key={film.id} className="bg-neutral-800 p-4 shadow-md rounded-md">
              <img
                className="w-full h-auto rounded-md"
                src={film.image}
                alt={film.title}
              />
              <div className="mt-2">
                <h3 className="text-lg font-semibold">{film.title}</h3>
                <p className="text-sm text-gray-500">{film.short_description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const categories = [
  "Анимация",
  "Комедия",
  "Приключения",
  "Боевик",
  "Триллер",
  "Фантастика",
  "Биография",
  "Драма",
  "Мюзикл",
  "Фэнтези",
  "Романтика"
];
