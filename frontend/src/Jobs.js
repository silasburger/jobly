import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Search from './Search';
import JoblyApi from './JoblyApi';
import { Alert } from 'reactstrap';
import JobCard from './JobCard';
import './Jobs.css';

//This renders the job page with job cards
class Jobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobCards: [],
      errors: [],
      isLoading: true
    };
    this.updateCards = this.updateCards.bind(this);
  }

  async componentDidMount() {
    try {
      let response = await JoblyApi.getJobs('');
      this.setState({ jobCards: response, isLoading: false });
      console.log(response);
    } catch (err) {
      // set State this.state.errors = with new error
      this.setState(st => ({
        errors: [...st.errors, err]
      }));
    }
  }

  //Gets results from database and updates jobCards state
  async updateCards(searchTerm) {
    try {
      // Making the AJAX call to search for companies matching search
      let response = await JoblyApi.getJobs(searchTerm);
      console.log(response);
      this.setState({ jobCards: response });
    } catch (err) {
      // set State this.state.errors = with new error
      this.setState(st => ({
        errors: [...st.errors, err]
      }));
    }
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    if (this.props.currUser === null) {
      return <Redirect to="/login" />;
    }
    let jobCards = this.state.jobCards.map(card => (
      <JobCard
        key={card.id}
        id={card.id}
        companyHandle={card.companyHandle}
        equity={card.equity}
        salary={card.salary}
        title={card.title}
        state={card.state}
        currUser={this.props.currUser}
      />
    ));
    let errorsAlerts = this.state.errors.map(err => (
      <Alert key={err} color="danger">
        {err}
      </Alert>
    ));

    // if theres stuff in err Array, then return alert
    if (this.state.errors.length > 0) {
      return <div>{errorsAlerts}</div>;
    }

    return (
      <div className="jobs-container">
        <Search updateCards={this.updateCards} />
        <div className="cards-container">{jobCards}</div>
        {this.state.jobCards.length ? null : <h1>Sorry, no matching jobs</h1>}
      </div>
    );
  }
}

export default Jobs;
