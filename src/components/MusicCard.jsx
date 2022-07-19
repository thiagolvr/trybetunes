import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };

    this.handleChecked = this.handleChecked.bind(this);
  }

  async handleChecked({ target: { dataset } }) {
    this.setState({
      loading: true,
    });
    const { musics } = this.props;
    const id = dataset.testid.split('-')[2];
    const musicToFavorite = musics.find(({ trackId }) => trackId === Number(id));
    await addSong(musicToFavorite);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    const { musics } = this.props;
    return (
      <div>
        {
          loading
            ? <Loading />
            : (
              <div>
                {musics.map(({ trackName, previewUrl, trackId }) => (
                  <div key={ trackId }>
                    <audio data-testid="audio-component" src={ previewUrl } controls>
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      {' '}
                      <code>audio</code>
                    </audio>
                    <p>{trackName}</p>
                    <label htmlFor="favorite-song">
                      Favorita
                      <input
                        data-testid={ `checkbox-music-${trackId}` }
                        type="checkbox"
                        id="favorite-song"
                        onChange={ this.handleChecked }
                      />
                    </label>
                  </div>
                ))}
              </div>
            )
        }
      </div>
    );
  }
}

export default MusicCard;
