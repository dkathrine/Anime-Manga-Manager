import { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch'
import { useHistory } from 'react-router-dom'

const Delete = ({ id }) => {
    const history = useHistory()
    const url = `http://localhost:3000/library/delete/` + id;

    const { deleteData, data } = useFetch(url, 'DELETE')

    const handleDelete = (e) => {
        e.preventDefault();
        deleteData();
    };

    // redirect the user when we get data response
    useEffect(() => {
        if (data) {
            history.push('/')
        }
    }, [data, history])

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Delete