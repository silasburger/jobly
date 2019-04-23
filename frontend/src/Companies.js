import React, { Component } from 'react';
import Search from './Search';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyApi';
import {Alert} from 'reactstrap';
import logoDefaultUrl from './company-logo.png';
import { Redirect } from 'react-router-dom';
import './Companies.css';

// Comonent renders company page which shows a list of CompanyCards
class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCards: [],
      errors: [],
      isLoading: true
    };
    this.updateCards = this.updateCards.bind(this);
  }

  async componentDidMount() {
    try {
      if (this.props.currUser) {
        let response = await JoblyApi.getCompanies('');
        this.setState(st => ({ companyCards: response, isLoading: false }));
      }
    } catch (err) {
      // set State this.state.errors = with new error
      this.setState(st => ({
        errors: [...st.errors, err]
      }));
    }
  }

  //This update cards function is user for Search Component and updates state
  async updateCards(searchTerm) {
    try {
      // Making the AJAX call to search for companies matching search
      let response = await JoblyApi.getCompanies(searchTerm);
      console.log(response.companies);
      this.setState(st => ({ companyCards: response }));
    } catch (err) {
      // set State this.state.errors = with new error
      this.setState(st => ({
        errors: [...st.errors, err]
      }));
    }
  }

  render() {
    if (this.props.currUser === null) {
      return <Redirect to="/login" />;
    }

    //This converts companyCards from state to company card components
    let companyCards = this.state.companyCards.map(card => (
      <CompanyCard
        key={card.handle}
        name={card.name}
        description={card.description}
        logoUrl={card.logo_url || logoDefaultUrl}
        handle={card.handle}
      />
    ));

    let errorAlerts = this.state.errors.map(err => (
      <Alert key={err} color="danger">{err}</Alert>
    ));

    if(this.state.isLoading) {
      return (<h1>Loading...</ h1>)
    }

    // if theres stuff in err Array, then return alert
    if (this.state.errors.length > 0) {
      return <div>{errorAlerts}</div>;
    }

    return (
      <div className='companies-container'>
        <Search updateCards={this.updateCards} />
        {companyCards}
        {this.state.companyCards.length ? null : <h1>Sorry, no matching companies</h1>}
      </div>
    );
  }
}

export default Companies;
