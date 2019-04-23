import React, { Component } from 'react';
import JoblyApi from '../../JoblyApi';
import uuid from 'uuid/v4'
import './Login.css';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardText,
  CardBody,
  Col,
  Alert
} from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      errors: [],
      activeForm: 'login'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeToLogin = this.changeToLogin.bind(this);
    this.changeToSignup = this.changeToSignup.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  changeToLogin() {
    this.setState({
      errors: [],
      activeForm: 'login'
    });
  }

  changeToSignup() {
    this.setState({
      errors: [],
      activeForm: 'signup'
    });
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault();

      // The if side of this handles a successful login
      if (this.state.activeForm === 'login') {
        let token = await JoblyApi.login(
          this.state.username,
          this.state.password
        );
        console.log('set token', token);
        localStorage.setItem('token', token);
        this.setState({ username: '', password: '' });
        await this.props.handleLogin();
        this.props.history.push('/jobs');

        // The else side of this handles a successful registrations
      } else {
        let token = await JoblyApi.register(
          this.state.username,
          this.state.password,
          this.state.email,
          this.state.first_name,
          this.state.last_name
        );

        //put token in local storage
        localStorage.setItem('token', token);

        this.setState({
          username: '',
          password: '',
          first_name: '',
          last_name: '',
          email: ''
        });
        await this.props.handleLogin();
        this.props.history.push('/jobs');
      }
    } catch (err) {
      // set State this.state.errors = with new error
      console.log(err);
      this.setState({
        errors: err
      });
    }
  }

  render() {
    let errorsAlerts = this.state.errors.map(err => (
      <Alert key={uuid()} className="m-0" color="danger" key={err}>
        {err}
      </Alert>
    ));

    let loginInputs = [
      {
        label: 'Username',
        inputName: 'username',
        type: 'text',
        value: this.state.username
      },
      {
        label: 'Password',
        inputName: 'password',
        type: 'password',
        value: this.state.password
      }
    ];

    let signupInputs = [
      {
        label: 'Username',
        inputName: 'username',
        type: 'text',
        value: this.state.username
      },
      {
        label: 'Password',
        inputName: 'password',
        type: 'password',
        value: this.state.password
      },
      {
        label: 'Email',
        inputName: 'email',
        type: 'text',
        value: this.state.email
      },
      {
        label: 'First Name',
        inputName: 'first_name',
        type: 'text',
        value: this.state.first_name
      },
      {
        label: 'Last Name',
        inputName: 'last_name',
        type: 'text',
        value: this.state.last_name
      }
    ];

    let inputs;

    if (this.state.activeForm === 'login') {
      inputs = loginInputs.map(input => (
        <FormGroup>
          <Label htmlFor={input.inputName}>{input.label}</Label>
          <Input
            type={input.type}
            name={input.inputName}
            value={this.state[input.inputName]}
            id={input.inputName}
            onChange={this.handleChange}
          />
        </FormGroup>
      ));
    } else {
      inputs = signupInputs.map(input => (
        <FormGroup>
          <Label htmlFor={input.inputName}>{input.label}</Label>
          <Input
            type={input.type}
            name={input.inputName}
            value={this.state[input.inputName]}
            id={input.inputName}
            onChange={this.handleChange}
          />
        </FormGroup>
      ));
    }

    return (
      <div className="login-container">
        <Card className="login-card" inverse>
          {this.state.errors.length > 0 ? errorsAlerts : null}
          <div className="login-buttons">
            {this.state.activeForm === 'login' ? (
              <Button onClick={this.changeToSignup} color="success">
                Signup
              </Button>
            ) : (
              <Button onClick={this.changeToLogin} color="success">
                Login
              </Button>
            )}
          </div>
          <Form onSubmit={this.handleSubmit} className="m-4">
            {inputs}

            <Button className="col-12 text-center" color="primary">
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Login;
