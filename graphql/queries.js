import {gql} from '@apollo/client';

const GET_ALL_POSTS = gql`
query{
  posts {
    data {
      id
      attributes {
        title
        description
        
      }
    }
  }
}`

const GET_SINGLE_POST = gql`
query Title($id: ID!) {
  post(id: $id) {
    data {
      attributes {
        title
        description
        content
      }
    }
  }
}`

export {GET_ALL_POSTS, GET_SINGLE_POST}