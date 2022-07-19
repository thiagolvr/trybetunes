import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      albunInfo: {},
    };
  }

  componentDidMount() {
    this.handleGetMusics();
  }

  async handleGetMusics() {
    const { match: { params: { id } } } = this.props;
    const getMusicsData = await getMusics(id);
    const [albunInfo, ...musics] = getMusicsData;
    this.setState({
      musics,
      albunInfo,
    });
  }

  render() {
    const {
      musics, albunInfo: {
        artistName, collectionName, artworkUrl100,
      },
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <main>
          <p data-testid="album-name"><big>{collectionName}</big></p>
          <p data-testid="artist-name">{artistName}</p>
          <img src={ artworkUrl100 } alt={ artistName } />
          <MusicCard musics={ musics } />
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
