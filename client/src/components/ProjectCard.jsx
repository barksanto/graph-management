

function ProjectCard({ project }) {
  const status = project.status;
  let statusTextColor;

  if (status === "Completed") {
    statusTextColor = 'green'
  } else if (status === "In Progress") {
    statusTextColor = 'blue'
  } else {
    statusTextColor = 'red'
  }
  console.log(statusTextColor)

  return (
    <div className="col-md-6">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5> 
            <a  className="btn btn-light" href={`/projects/${project.id}`}>View</a>
          </div>
        </div>
        <p className="small mx-3" >Status:<strong style={{color: statusTextColor}}>{ project.status}</strong></p>
      </div>

    </div>
  )
}

export default ProjectCard