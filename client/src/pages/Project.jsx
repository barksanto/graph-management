import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../components/queries/projectQueries';

function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-primary mb-3">Go back</Link>
          <div>{ data.project.name}</div>
        </div>
      )}
    </>
  )
}

export default Project