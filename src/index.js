import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, HttpLink, split } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';

const wsLink = new WebSocketLink({
  uri: 'ws://192.168.1.116:8585/query',
  options: {
    reconnect: true,
  }
})

const link = split(
  (operation) => operation.getContext().version === 1,
  new HttpLink({ uri: 'http://localhost:4000/v1/graphql' }),
  new HttpLink({ uri: "http://localhost:4000/v2/graphql" }),
  wsLink
);

const client = new ApolloClient({ link, cache: new InMemoryCache() });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));

serviceWorker.unregister();
