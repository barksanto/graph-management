import {FaTrash} from 'react-icons/fa'

export default function ClientRow({ client }) {
   return (
      <tr key={client.id}>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          <button className='btn btn-danger btn-sm'><FaTrash/></button>
        </td>
      </tr>
      )
}
