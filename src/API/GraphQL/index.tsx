import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { gql } from 'graphql-tag';

const httpLink = createHttpLink({
  uri: 'https://profound-marmot-29.hasura.app/v1/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

//-------------------End Points-------------------------\\

export const My_Query = gql`
  query MyQuery {
    check_in {
      id
      comment
      created_at
      image_url
      name
      updated_at
    }
  }
`;

export const ADD_CHECK_IN = gql`

mutation MyMutation($check_in: check_in_insert_input!) {
  insert_check_in_one(object: $check_in) {
    id
      name
      comment
      image_url
  }
}
`;
