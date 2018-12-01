import React, {Component} from 'react';
import { Container, Row, Col, Input, Button, Card, CardBody} from 'mdbreact';

class LoginCard extends Component  {
  render() {
    return(
      
        <Container>
  
        <Row>
          <Col md="6">
          <Card>
            <CardBody>
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
            </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default LoginCard;