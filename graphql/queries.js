import {gql} from '@apollo/client';

const GET_ALL_POSTS = gql`
query{
  posts {
    data {
      id
      attributes {
        title
        description
        thumbnail {
          data {
            attributes {
              url
              provider_metadata
            }
          }
        }
      }
    }
  }
}`

const GET_SINGLE_POST = gql`
query Title($id: ID!) {
  post(id: $id) {
    data {
      attributes {
        thumbnail {
          data {
            attributes {
              url
            }
          }
        }
        title
        description
        content
        photo {
          title
          description
          photo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
}`

export {GET_ALL_POSTS, GET_SINGLE_POST}