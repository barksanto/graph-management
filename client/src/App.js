import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Project from "./pages/Project"
import Header from "./components/Header"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

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
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App
