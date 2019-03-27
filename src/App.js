import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER = gql`
  query users($name:String!){
    users(name:$name){
      id
      userName
      firstName
      lastName
    }
  }
`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      repos: [],
    }
    this.fetchQuery = this.fetchQuery.bind(this);
  }

  componentDidMount(){
    this.fetchQuery();
  }

  fetchQuery = async () => {
    const {client} = this.props;
    const result  = await client.query({
      query:GET_USER,
      variables: {
        name: 'Sky',
      },
      context:{
        version: 2
      },
    });
    this.setState({ repos: result.data.feed });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default withApollo(App);
