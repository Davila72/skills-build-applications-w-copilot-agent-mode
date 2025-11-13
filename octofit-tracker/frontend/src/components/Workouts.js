import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center py-4">Cargando entrenamientos...</div>;

  if (!workouts.length) return <div className="alert alert-warning">No hay entrenamientos registrados.</div>;

  const columns = workouts.length ? Object.keys(workouts[0]) : [];

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-warning text-dark">
        <h2 className="h4 mb-0">Entrenamientos</h2>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                {columns.map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workouts.map((w, i) => (
                <tr key={w.id || i}>
                  {columns.map(col => (
                    <td key={col}>{typeof w[col] === 'object' ? JSON.stringify(w[col]) : w[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-warning mt-3 text-dark" onClick={() => window.location.reload()}>Refrescar</button>
      </div>
    </div>
  );
};

export default Workouts;
