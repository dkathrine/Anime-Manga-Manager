import { useFetch } from '../../hooks/useFetch'
import AnimeList from '../../components/AnimeList'

// styles
import './Home.css'

export default function Home() {
  const { data: animeData, isPending: animePending, error: animeError } = useFetch('http://localhost:3000/library/all')

  return (
    <div className="home">
      {animeError && <p className="error">{animeError}</p>}
      {animePending && <p className="loading">Loading...</p>}
      {animeData && <AnimeList animes={animeData} />}
    </div>
  )
}
