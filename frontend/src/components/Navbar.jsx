import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// styles
import "./Navbar.css";
import Searchbar from "./Searchbar";

export default function Navbar() {
  const { color, changeColor } = useTheme();
  return (
    <div className="navbar" style={{ background: color }}>
      <nav onClick={() => changeColor("purple")}>
        <Link to="/" className="brand">
          <h1>My Library</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Add Anime/Manga</Link>
      </nav>
    </div>
  );
}
