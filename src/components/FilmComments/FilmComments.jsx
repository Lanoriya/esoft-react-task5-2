import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../../redux/filmComments';
import { selectCommentsForFilm } from '../../redux/selectors';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

function FilmComments({ filmId }) {
  const dispatch = useDispatch();
  const comments = useSelector(state => selectCommentsForFilm(state, filmId));
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(addComment({ filmId, comment: { author: 'Анонимный пользователь', text: data.comment } }));
    reset();
  };

  return (
    <div className="p-4 rounded">
      <h2 className="text-lg font-bold mb-4">Комментарии к фильму на сайте</h2>
      <ul className="list-disc ml-8">
        {comments.map((comment, index) => (
          <li key={index} className="mb-2">
            <strong className="font-bold">{comment.author}: </strong>
            <span>{comment.text}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="w-full p-2 mt-4 text-black border border-gray-300 rounded"
          {...register('comment', { required: true })}
          placeholder="Добавить комментарий"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Добавить комментарий
        </button>
      </form>
    </div>
  );
}

FilmComments.propTypes = {
  filmId: PropTypes.number.isRequired,
};

export default FilmComments;
