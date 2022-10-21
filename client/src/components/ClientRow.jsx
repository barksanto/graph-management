import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { useQuery } from "@apollo/client"
import { GET_CLIENTS } from './queries/clientQueries' // <-- use this to refetch clients after mutation is complete
import { GET_USER_PROJECTS, GET_PROJECTS } from './queries/projectQueries'

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{query: GET_CLIENTS},{query: GET_PROJECTS} ] //#  <-- this is the query we want to refetch after the mutation
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS })
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter((c) => c.id !== deleteClient.id) },
    //   })
    // } // Set the data to the response of deleteClient mutation


  })


  const { loading, error, data } = useQuery(GET_USER_PROJECTS)

  const showClientProjects = (projectData, clientId) => {
    console.log(clientId)
  }

   return (
      <tr key={client.id} onClick={() => showClientProjects(data, client.id)}>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          <button className='btn btn-danger btn-sm' onClick={deleteClient}><FaTrash/></button>
        </td>
      </tr>
      )
}
