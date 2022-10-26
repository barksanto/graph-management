import { FaTrash, FaEye, AiFillEyeInvisible } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { useQuery } from "@apollo/client"
import { GET_CLIENTS } from './queries/clientQueries' // <-- use this to refetch clients after mutation is complete
import { GET_USER_PROJECTS, GET_PROJECTS } from './queries/projectQueries'
import { useState } from 'react'

export default function ClientRow({ client }) {
  const [showClientProjects, setShowClientProjects] = useState(false)

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{query: GET_CLIENTS},{query: GET_PROJECTS} ] //#  <-- this is the query we want to refetch after the mutation

  })
 
  // const { loading, error, data } = useQuery(GET_USER_PROJECTS)
  const {  data } = useQuery(GET_USER_PROJECTS) // same as above, just omit loading and error

  // const showThisClientsProjects = (projectData, clientId) => {
  //   console.log(showClientProjects)
  //   setShowClientProjects(!showClientProjects) // <-- this is the function that toggles the state of showing client projects
  //   console.log(showClientProjects)
  // }

  if (data) {
    let uniqueClientProjs = data.projects.filter(project => project.client.id === client.id)
    uniqueClientProjs.forEach(project => console.log(project.name))
  }
  
  return (
    <>
      {/* {showClientProjects ? <ShowClientProjects clientData={client.id} projectData={ data} /> : null}  */}
      <tr key={client.id}  >
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          <button className='btn btn-danger btn-sm' onClick={deleteClient}><FaTrash/></button>
        </td>
        <td>
          <p onClick={() => setShowClientProjects(!showClientProjects)}>
            <button className='btn btn-info btn-sm' >{showClientProjects ? "Hide Projects" : <FaEye />}</button>
          </p>
          <ul>
           {showClientProjects ? data.projects.filter(project => project.client.id === client.id).map(project => <li key={project.id }>{project.name}</li>) : null}
          </ul>
        </td>
      </tr>
      </>
      )
}
