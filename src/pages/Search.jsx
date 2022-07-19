import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchArtistInput: '',
      searchedName: '',
      loading: false,
      gettedAlbuns: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      searchArtistInput: value,
      searchedName: value,
    });
  }

  async handleClick() {
    this.setState({
      searchArtistInput: '',
      loading: true,
    });
    const { searchedName } = this.state;
    const gettedAlbuns = await searchAlbumsAPI(searchedName);
    this.setState({
      gettedAlbuns,
      loading: false,
    });
  }

  render() {
    const { searchArtistInput, loading, gettedAlbuns, searchedName } = this.state;
    const NUMBER_TWO = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <main>
          {
            loading
              ? <Loading />
              : (
                <form>
                  <label htmlFor="searchArtistInput">
                    Pesquisar
                    <input
                      data-testid="search-artist-input"
                      type="text"
                      name="searchArtistInput"
                      id="searchArtistInput"
                      value={ searchArtistInput }
                      onChange={ this.handleChange }
                      placeholder="Digite o nome de algum artista ou album"
                    />
                  </label>
                  <button
                    data-testid="search-artist-button"
                    type="button"
                    disabled={ searchArtistInput.length < NUMBER_TWO }
                    onClick={ this.handleClick }
                  >
                    Pesquisar
                  </button>
                </form>
              )
          }

          {
            gettedAlbuns.length
              ? (
                <p>
                  Resultado de álbuns de:
                  {' '}
                  {searchedName}
                </p>
              )
              : null
          }

          {
            gettedAlbuns.map(({
              artistName,
              collectionId,
              collectionName,
              artworkUrl100,
            }) => (
              <div key={ collectionId }>
                <img src={ artworkUrl100 } alt={ collectionName } />
                <p><big>{collectionName}</big></p>
                <p><strong>{artistName}</strong></p>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `album/${collectionId}` }
                >
                  Detalhes
                </Link>
              </div>
            ))
          }

          {
            gettedAlbuns.length
              ? null
              : <p>Nenhum álbum foi encontrado</p>
          }

        </main>
      </div>
    );
  }
}

export default Search;
