import { useState } from 'react';
import { FaUser } from 'react-icons/fa'
// import { useMutation } from '@apollo/client'



function AddClientModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("hi");
  }

  return (
    <>
    <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#addClientModal">
      <div className="d-flex align-items-center">
          <FaUser />
          <div className="mx-2">Add Client</div>
      </div>
    </button>

    <div className="modal fade" id="addClientModal" role="dialog" aria-labelledby="addClientModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className='mb-3' onSubmit={onSubmit}>
              <label htmlFor="" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={ name } onChange={(e) => setName(e.target.value)} />
              
              <label htmlFor="" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                
              <label htmlFor="" className="form-label">Phone</label>
              <input type="text" className="form-control" id="phone" value={ phone } onChange={(e) => setPhone(e.target.value)} />
             <button
              type="submit"
              data-bs-dismiss="modal"
              className='btn btn-secondary'>
              Submit
            </button>
              </form>
            </div>
           
          {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div> */}
          </div>
          
      </div>
</div>
    </> 
  )
}

export default AddClientModal