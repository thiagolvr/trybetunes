import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginNameInput: '',
      loading: false,
      redirect: false,

    };
    this.handleInputLoginName = this.handleInputLoginName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputLoginName({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit() {
    const { loginNameInput } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginNameInput });
    this.setState({ redirect: true, loading: false });
  }

  render() {
    const { loginNameInput, redirect, loading } = this.state;
    const NUMBER_THREE = 3;
    return (
      <div data-testid="page-login">
        {
          loading
            ? <Loading />
            : (
              <form>
                <label htmlFor="loginNameInput">
                  Login:
                  <input
                    data-testid="login-name-input"
                    type="text"
                    name="loginNameInput"
                    id="loginNameInput"
                    onChange={ this.handleInputLoginName }
                  />
                </label>
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ loginNameInput.length < NUMBER_THREE }
                  onClick={ this.handleSubmit }
                >
                  Entrar

                </button>
              </form>
            )
        }
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
