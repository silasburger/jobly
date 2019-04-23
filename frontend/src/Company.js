import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import {Alert} from 'reactstrap';
import './Company.css';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: { jobs: [] },
      myApps: [],
      errors: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    //error handling
    try {
      let response = await JoblyApi.getCompany(this.props.match.params.handle);

      let myApps = await JoblyApi.myJobApplications(
        this.props.currUser.username
      );

      this.setState({ company: response, myApps, isLoading: false });
    } catch (err) {
      // set State this.state.errors = with new error
      this.setState(st => ({
        errors: [...st.errors, err]
      }));
    }
  }

  render() {
    let jobIDs = new Set();
    for (let i = 0; i < this.state.myApps.length; i++) {
      jobIDs.add(this.state.myApps[i].job_id);
    }
    console.log(jobIDs);

    let jobCards = this.state.company.jobs.map(card => {
      //if this card ID is in this.state.myApps, state should be 'applied'
      let state;

      if (jobIDs.has(card.id)) {
        state = 'applied';
      }

      if(this.state.isLoading) {
        return (<h1>Loading...</ h1>)
      }

      return (
        <JobCard
          key={card.id}
          id={card.id}
          companyHandle={card.companyHandle}
          equity={card.equity}
          salary={card.salary}
          title={card.title}
          currUser={this.props.currUser}
          state={state}
        />
      );
    });

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
      <div className="company-container">
        <h1>{this.state.company.name}</h1>
        <p>{this.state.company.description}</p>
        <div className="company-jobs-container">
        {jobCards}
        </div>
      </div>
    );
  }
}

export default Company;
