import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };

    this.handleChecked = this.handleChecked.bind(this);
  }

  async handleChecked({ target: { dataset } }) {
    const { trackId } = this.props;
    this.setState({ loading: true });
    await addSong(trackId);
    this.setState({ loading: false, checked: true });
  }

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        {
          loading
            ? <Loading />
            : (
              <div>
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
                      checked={ checked }
                      onChange={ this.handleChecked }
                    />
                  </label>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

export default MusicCard;
