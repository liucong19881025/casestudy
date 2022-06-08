import React from 'react';
import PropTypes from 'prop-types';
import { withStore } from '../store';
import logo from '../guantian.JPG';
import API from '../api/api';

// Define the main app
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { store } = this.props;
    if (!store.get('user')) {
      API.get('auth/me').then(({ data }) => {
        store.set('user', data);
      });
    }
  }

  handleLogout() {
    const { store } = this.props;
    store.set('user', {});
    localStorage.removeItem('token');
  }

  render() {
    const { store } = this.props;
    const user = store.get('user');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Guan Tian Technology
          </h1>
          {user && user.id && (
            <p>
              {'Hello, '}
              {user.firstName}
              {' '}
              {user.lastName}
            </p>
          )}
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};
export default withStore(Header);
