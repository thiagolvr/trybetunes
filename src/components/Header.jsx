import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };

    this.recoveryUserName = this.recoveryUserName.bind(this);
  }

  componentDidMount() {
    this.recoveryUserName();
  }

  async recoveryUserName() {
    const user = await getUser();
    this.setState({
      user: user.name,
    });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">{user || <Loading /> }</span>

        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Pesquisar</Link>
        <Link to="/profile" data-testid="link-to-profile">Pesquisar</Link>
      </header>
    );
  }
}

export default Header;
