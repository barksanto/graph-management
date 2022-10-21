import { gql } from "@apollo/client"

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      status
    }
  }
`

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`

const GET_USER_PROJECTS = gql`
  {
    projects {
      name
      description
      status
      id
      client {
        name
        id
      }
    }
  }
`

export { GET_PROJECTS, GET_PROJECT, GET_USER_PROJECTS }
