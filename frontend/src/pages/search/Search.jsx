import { useFetch } from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import AnimeList from '../../components/AnimeList'

// styles
import './Search.css'

export default function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  const animeUrl = 'http://localhost:3000/library/byName?q=' + query
  const { data: animeData, isPending: animePending, error: animeError } = useFetch(animeUrl);

  return (
    <div>
      <h2 className="page-title">Anime & Manga including "{query}"</h2>
      {animeError && <p className="error">{animeError}</p>}
      {animePending && <p className="loading">Loading...</p>}
      {animeData && <AnimeList animes={animeData} />}
    </div>
  )
}