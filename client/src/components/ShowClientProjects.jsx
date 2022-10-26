
function ShowClientProjects({ clientData, projectData }) {
  // const {  data } = useQuery(GET_USER_PROJECTS) // same as above, just omit loading and error
  
  //  console.log('This is the clientID:', clientData)
    let uniqueClientProjs = projectData.projects.filter(project => project.client.id === clientData)
  console.log(clientData, uniqueClientProjs)

  return (
    <div>Client ID: {clientData}</div>
  )
}

export default ShowClientProjects