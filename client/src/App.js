import Header from "./components/Header"
import Clients from "./components/Clients"
import Projects from "./components/Projects"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import AddClientModal from "./components/AddClientModal"

const cache = new InMemoryCache({
  // this is the cache
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming // this returns the incoming data for clients
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming // this returns incoming data for projects
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  uri: "http://localhost:5500/graphql",
  cache,
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModal />
          <Projects/>
          <Clients />
        </div>
      </ApolloProvider>
    </>
  )
}

export default App
