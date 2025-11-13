import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched leaderboard:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center py-4">Cargando leaderboard...</div>;

  if (!leaders.length) return <div className="alert alert-warning">No hay datos de leaderboard.</div>;

  const columns = leaders.length ? Object.keys(leaders[0]) : [];

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-success text-white">
        <h2 className="h4 mb-0">Leaderboard</h2>
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
              {leaders.map((l, i) => (
                <tr key={l.id || i}>
                  {columns.map(col => (
                    <td key={col}>{typeof l[col] === 'object' ? JSON.stringify(l[col]) : l[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-success mt-3" onClick={() => window.location.reload()}>Refrescar</button>
      </div>
    </div>
  );
};

export default Leaderboard;
