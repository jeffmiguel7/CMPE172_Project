import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Container, Icon, Image, Menu, Segment, Dropdown} from 'semantic-ui-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  async logout() {
    this.props.auth.logout('/');
  }
  
  render() {

    const dropdownOptions = [
      { value: '0', text: <span><Icon name='mail outline icon' /><a href="https://dev-630184.okta.com/home/google/0oajfjxyrMWG50nsC356/50" target="_blank">Gmail</a></span> },
      { value: '1', text: <span><Icon name='google drive icon' /><a href="https://dev-630184.okta.com/home/google/0oajfjxyrMWG50nsC356/52" target="_blank">Google Drive</a></span> },
      { value: '2', text: <span><Icon name='calendar alternate outline icon' /><a href="https://dev-630184.okta.com/home/google/0oajfjxyrMWG50nsC356/54" target="_blank">Google Calendar</a></span> },
    ]

    return (
      <div>
        <Menu fixed="top" class="">
          <Container>
            <Menu.Item as="a" header href="/">
              <Image size="mini" src="/empay-logo_400px.png" />
              &nbsp;
              Empay
            </Menu.Item>
            {this.state.authenticated === true && <Menu.Item id="profile-button" as="a" href="/profile"><Icon name="large user outline" />Profile</Menu.Item>}
            {this.state.authenticated === true && <Menu.Item id="employees-button" as="a" href="/admin"><Icon name="large address book outline" />Employees</Menu.Item>}
            {this.state.authenticated === true && <Menu.Item id="jenkins-button" as="a" href="https://dev-630184.okta.com/home/sjsudev630184_samltest_1/0oaiy601s38v17yVC356/alniy943nVUempama356" target="_blank"><Icon name="big jenkins icon" />Jenkins</Menu.Item>}
            {this.state.authenticated === true && <Menu.Item id="github-button" as="a" href="https://ec2-54-80-227-236.compute-1.amazonaws.com/" target="_blank"><Icon name="big github icon" />Github</Menu.Item>}
            {this.state.authenticated === true && <Menu.Item><Dropdown text={<span><Icon name='large google icon'/>G Suite</span>} options={dropdownOptions} /></Menu.Item>}
            {this.state.authenticated === true && <Menu.Item position="right" id="logout-button" as="a" onClick={this.logout}><Icon name="sign out" />Logout</Menu.Item>}
            {this.state.authenticated === false && <Menu.Item as="a" onClick={this.login}>Login</Menu.Item>}

          </Container>
        </Menu>
      </div>
    );
  }
});
