import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// styles
import "./AnimeList.css";

export default function AnimeList({ animes }) {
  const { mode } = useTheme();

  if (animes.length === 0) {
    return <div className="error">No animes to load...</div>;
  }
  return (
    <div className="recipe-list">
      {animes?.map((anime) => (
        <div key={anime._id} className={`card ${mode}`}>
          <h3>{anime.name}</h3>
          <p>{anime.status}</p>
          <p>{anime.type}</p>
          <div className="coverIMG">
            <img src={anime.coverURL} alt={anime.name} />
          </div>
          {/* <div>{anime.description}...</div> */}
          <Link to={`/library/${anime._id}`}>More Details.</Link>
        </div>
      ))}
    </div>
  );
}
