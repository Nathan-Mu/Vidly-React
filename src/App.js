import React, {Component} from 'react';
import './App.css';
import {getMovies, getMovie} from "./services/fakeMovieService";

class App extends Component {
    state = {
        movies: []
    }

    handleDeleteClick = (id) => {
        let movies = [...this.state.movies];
        const movie = getMovie(id);
        const index = movies.indexOf(movie);
        if (index >= 0)
            movies.splice(index, 1);
        this.setState({movies});
    }

    render() {
        const {movies} = this.state;
        return (
            <main className={"container"}>
                <Header movies={movies}/>
                <Table movies={movies} handleDelete={this.handleDeleteClick}/>
            </main>
        );
    }

    componentDidMount() {
        const movies = getMovies();
        this.setState({movies});
    }
}

const Header = (props) => props.movies.length > 0 ? <p>Showing {props.movies.length} movies in the database.</p> :
    <p>No movies.</p>;

class Table extends Component {
    render() {
        const {movies} = this.props;
        return (
            movies.length > 0 &&
            (<table>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                </tr>
                {movies.map(movie => (
                    <tr>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                            <button onClick={() => this.props.handleDelete(movie._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </table>)
        )
    }
}


export default App;
