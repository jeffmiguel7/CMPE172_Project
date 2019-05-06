import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Button, Header, Segment, Label, Container, Image, Divider } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';
import pageLogo from './empay-logo-for-page.png';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
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
  
  render() {

    return (
      <div>
        {this.state.authenticated !== null &&
        <div>
          {this.state.authenticated &&
              <Segment raised>
                <Label attached='top'><Header>Account Outline</Header></Label>
                <Label as='a' color='blue' ribbon>
                  Administrator
                </Label>
                <Header as="h3">
                  You have now logged in as an administator and can access both the employees and salary databases.
                </Header>
                
                <div class="ui divider"></div>
                
                  The Employees tab will redirect you to the page to view and to update the databases. 
                  The Jenkins and GSuite options will redirect you to their respective pages.
              </Segment>
              
          }
          {!this.state.authenticated &&
            <Container>
              <Container> <Image src={pageLogo} size='medium' centered/> </Container>
              <Segment>
                <div>
                  <Header textAlign='center'>
                    Welcome to the Empay Portal! Please login to enter the application.
                  </Header>

                  <div class="ui divider"></div>

                  <Button fluid id="login-button" primary onClick={this.login}>Login</Button>
                </div>
              </Segment>
            </Container>
          }

        </div>
        }
      </div>
    );
  }
});
