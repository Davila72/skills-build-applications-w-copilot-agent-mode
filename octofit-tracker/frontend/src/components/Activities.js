import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center py-4">Cargando actividades...</div>;

  if (!activities.length) return <div className="alert alert-warning">No hay actividades registradas.</div>;

  // Obtener columnas dinámicamente
  const columns = activities.length ? Object.keys(activities[0]) : [];

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">Actividades</h2>
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
                {activities.map((a, i) => (
                  <tr key={a.id || i}>
                    {columns.map(col => (
                      <td key={col}>{typeof a[col] === 'object' ? JSON.stringify(a[col]) : a[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>Refrescar</button>
        </div>
      </div>

      {/* Cards de actividades */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
        {activities.slice(0, 6).map((a, i) => (
          <div className="col" key={a.id || i}>
            <div className="card h-100 border-primary shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">Actividad #{a.id || i+1}</h5>
                <ul className="list-unstyled mb-2">
                  {Object.entries(a).map(([k, v]) => (
                    <li key={k}><strong>{k}:</strong> {typeof v === 'object' ? JSON.stringify(v) : v}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Activities;
