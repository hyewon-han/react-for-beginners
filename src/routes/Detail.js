import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(movie);
  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie__wrap}>
          <img
            src={movie.large_cover_image}
            className={styles.movie__coverimg}
          />
          <img src={movie.background_image} className={styles.movie__bgimg} />
          <div className={styles.movie__info}>
            <p className={styles.movie__title}>{movie.title}</p>
            <ul className={styles.movie__genres}>
              {movie.genres.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p>summary : {movie.description_full}</p>
            <p>runtime : {movie.runtime}</p>
            <p>year : {movie.year}</p>
            <a
              href={`https://www.youtube.com/watch?v=${movie.yt_trailer_code}`}
              target="_blank"
            >
              Go to youtube
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
