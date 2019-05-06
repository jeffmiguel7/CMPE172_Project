import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import Home from './Home';
import Admin from './Admin';
import Navbar from './Navbar';
import Profile from './Profile';


class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer= 'https://dev-630184.okta.com/oauth2/default'
          client_id='0oaiftouz20k2Xk6A356'
          redirect_uri='http://localhost:443/implicit/callback'
        >
          <Navbar />
          <Container text style={{ marginTop: '7em' }}>
            <Route path="/" exact component={Home} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <SecureRoute path="/admin" component={Admin} />
            <SecureRoute path="/profile" component={Profile} />
          </Container>
        </Security>
      </Router>
    );
  }
}

export default App;
