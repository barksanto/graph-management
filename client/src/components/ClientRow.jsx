import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from './queries/clientQueries' // <-- use this to refetch clients after mutation is complete

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{query: GET_CLIENTS}] // <-- this is the query we want to refetch after the mutation
  })

   return (
      <tr key={client.id}>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          <button className='btn btn-danger btn-sm' onClick={deleteClient}><FaTrash/></button>
        </td>
      </tr>
      )
}
