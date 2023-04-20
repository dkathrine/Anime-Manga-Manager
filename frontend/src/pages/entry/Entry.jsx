import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import Update from "../../components/Update";
import Delete from "../../components/Delete";
import { useState } from "react";

// styles
import "./Entry.css";

export default function Recipe() {
  const [isHidden, setIsHidden] = useState(false);
  const { mode } = useTheme();
  const { id } = useParams();
  const url = "http://localhost:3000/library/" + id;
  const { error, isPending, data: anime } = useFetch(url);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {anime && (
        <>
          <div className="page-title">
            <h2 style={{ marginBottom: "20px" }}>{anime.name}</h2>
            <p>{anime.type}</p>
            <p>{anime.type.startsWith('A') ? 'Episodes:' : 'Chapter:'} {anime.type.startsWith('A') ? anime.episodes : anime.chapter}</p>
            <p>{anime.status}</p>
          </div>
          <div className="page-title">
            <img src={anime.coverURL} alt={anime.name} />
            <ul>
              {anime.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
            <li>{anime.type.startsWith('A') ? "Studio:" : "Author:"} {anime.type.startsWith('A') ? anime.studio : anime.author}</li>
          </div>
          <div>{anime.description}</div>
          <p style={{ marginTop: "20px" }}>Score: {anime.score}</p>
          <Delete id={id} />
          <button onClick={() => setIsHidden((prevState) => !prevState)}>Edit</button>
          {isHidden && <Update id={id} animeData={anime} />}
        </>
      )}
    </div>
  );
}
