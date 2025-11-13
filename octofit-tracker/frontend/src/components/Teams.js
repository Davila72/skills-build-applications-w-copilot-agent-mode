import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center py-4">Cargando equipos...</div>;

  if (!teams.length) return <div className="alert alert-warning">No hay equipos registrados.</div>;

  const columns = teams.length ? Object.keys(teams[0]) : [];

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-info text-white">
        <h2 className="h4 mb-0">Equipos</h2>
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
              {teams.map((t, i) => (
                <tr key={t.id || i}>
                  {columns.map(col => (
                    <td key={col}>{typeof t[col] === 'object' ? JSON.stringify(t[col]) : t[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-info mt-3 text-white" onClick={() => window.location.reload()}>Refrescar</button>
      </div>
    </div>
  );
};

export default Teams;
