import React, {Component} from 'react';
import { Container, Row, Col, Input, Button} from 'mdbreact';

class LoginCard extends Component  {
  render() {
    return(
      
        <Container className="mt-5">
        <DocsLink
          title="Forms"
          href="https://mdbootstrap.com/docs/react/forms/basic/"
        />
        <Row>
          <Col md="6">
            <form>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <Input
                  label="Type your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  id="loginPage"
                />
                <Input
                  label="Type your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                />
              </div>
              <div className="text-center">
                <Button>Login</Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default LoginCard;