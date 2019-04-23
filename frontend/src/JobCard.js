import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import {Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap';

//Shows basic info on card used on company page and jobs page
class JobCard extends Component {
  constructor(props) {
    super(props);
    this.handleApplication = this.handleApplication.bind(this);
    this.state = {
      applied: false
    };
  }

  componentDidMount() {
    if (this.props.state === 'applied') {
      this.setState({ applied: true });
    }
  }

  async handleApplication() {
    let message = await JoblyApi.applyToJob(
      this.props.currUser.username,
      this.props.id,
      'applied'
    );
    this.setState({ applied: true });
  }

  render() {
    return (
      <Card>
        <h3>{this.props.title}</h3>
        <p>Salary: {this.props.salary}</p>
        <p>Equity: {this.props.equity}</p>

        {this.state.applied ? (
          <div>Application Received</div>
        ) : (
          <Button onClick={this.handleApplication}>Apply</Button>
        )}
      </Card>
    );
  }
}

export default JobCard;
