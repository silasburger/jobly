import React, { Component } from 'react';
import {Form, Button, Input} from 'reactstrap';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({ search: '' });
    this.props.updateCards(this.state.search);
  }

  render() {
    return (
        <Form onSubmit={this.handleSubmit} inline className='m-4'>
          <Input
            type="text"
            name="search"
            value={this.state.search}
            id="search"
            onChange={this.handleChange}
          />
          <Button>Search</Button>
        </Form>
    );
  }
}

export default Search;
