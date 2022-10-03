const { projects, clients } = require("../sampledata")

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  graphqlSync,
} = require("graphql")

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
})

// Project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
})

// Root query object
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return projects
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } }, // we pass in id we want for this client
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id)
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } }, // we pass in id we want for this client
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
