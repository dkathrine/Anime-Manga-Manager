import { useState, useRef, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useHistory } from 'react-router-dom'

// styles
import '../pages/create/Create.css'

export default function Update({ id, animeData }) {

    const [collection, setCollection] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [newGenre, setNewGenre] = useState('')
    const [genres, setGenres] = useState([])
    const [score, setScore] = useState('')
    const [episodes, setEpisodes] = useState('');
    const [chapter, setChapter] = useState('');
    const [author, setAuthor] = useState('');
    const [studio, setStudio] = useState('');
    const [type, setType] = useState('');
    const [coverURL, setCoverURL] = useState('');
    const genreInput = useRef(null)

    const url = `http://localhost:3000/library/update/` + id;

    const { patchData, data } = useFetch(url, 'PATCH')
    const history = useHistory()

    const handleSubmitManga = (e) => {
        e.preventDefault()
        patchData({ name, genres, description, status, score, chapter, author, type, coverURL })
    }

    const handleSubmitAnime = (e) => {
        e.preventDefault()
        patchData({ name, genres, description, status, score, episodes, studio, type, coverURL })
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const gen = newGenre.trim()

        if (gen && !genres.includes(gen)) {
            setGenres(prevGenres => [...prevGenres, newGenre])
        }
        setNewGenre('')
        genreInput.current.focus()
    }

    // redirect the user when we get data response
    useEffect(() => {
        if (data) {
            history.push('/')
        }
    }, [data, history])

    return (
        <div className="create">
            <h2 className="page-title" style={{ color: "whitesmoke" }}>Update this Entry:</h2>
            <form onSubmit={collection === "anime" ? handleSubmitAnime : handleSubmitManga}>

                <label>
                    <span>Collection:</span>
                    <select name="collection" id="collection" onChange={(e) => setCollection(e.target.value)}>
                        <option value="manga">Manga</option>
                        <option value="anime">Anime</option>
                    </select>
                </label>

                <label>
                    <span>Name:</span>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder={animeData.name}
                        value={name}
                    />
                </label>

                <label>
                    <span>{collection === "anime" ? "Episodes:" : "Chapter:"}</span>
                    <input
                        type="number"
                        onChange={collection === "anime" ? (e) => setEpisodes(e.target.value) : (e) => setChapter(e.target.value)}
                        value={collection === "anime" ? episodes : chapter}
                        placeholder={collection === "anime" ? animeData.episodes : animeData.chapter}
                    />
                </label>

                <label>
                    <span>Genres:</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={(e) => setNewGenre(e.target.value)}
                            value={newGenre}
                            ref={genreInput}
                        />
                        <button onClick={handleAdd} className="btn">add</button>
                    </div>
                </label>
                <p>Current genres: {animeData.genres.map(i => <em key={i}>{i}, </em>)} {genres.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span>Description:</span>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder={animeData.description}
                    />
                </label>

                <label>
                    <span>{collection === "anime" ? "Studio:" : "Author:"}</span>
                    <input
                        type="text"
                        onChange={collection === "anime" ? (e) => setStudio(e.target.value) : (e) => setAuthor(e.target.value)}
                        placeholder={collection === "anime" ? animeData.studio : animeData.author}
                        value={collection === "anime" ? studio : author}
                    />
                </label>

                <label>
                    <span>Type:</span>
                    <input
                        type="text"
                        onChange={(e) => setType(e.target.value)}
                        placeholder={animeData.type}
                        value={type}
                    />
                </label>

                <label>
                    <span>Cover URL:</span>
                    <input
                        type="text"
                        onChange={(e) => setCoverURL(e.target.value)}
                        placeholder={animeData.coverURL}
                        value={coverURL}
                    />
                </label>

                <label>
                    <span>Status:</span>
                    <select name="status" id="status" onChange={(e) => setStatus(e.target.value)}>
                        <optgroup label='for reading'>
                            <option value="Plan to Read">Plan to Read</option>
                            <option value="Reading">Reading</option>
                        </optgroup>
                        <optgroup label='for watching'>
                            <option value="Plan to Watch">Plan to Watch</option>
                            <option value="Watching">Waching</option>
                        </optgroup>
                        <option value="Completed">Completed</option>
                    </select>
                </label>

                <label>
                    <span>Score:</span>
                    <select name="score" id="score" onChange={(e) => setScore(e.target.value)}>
                        <option value="Select">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </label>

                <button className="btn">submit</button>
            </form>
        </div>
    )
}
