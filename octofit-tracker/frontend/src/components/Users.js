import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center py-4">Cargando usuarios...</div>;

  if (!users.length) return <div className="alert alert-warning">No hay usuarios registrados.</div>;

  const columns = users.length ? Object.keys(users[0]) : [];

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-secondary text-white">
        <h2 className="h4 mb-0">Usuarios</h2>
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
              {users.map((u, i) => (
                <tr key={u.id || i}>
                  {columns.map(col => (
                    <td key={col}>{typeof u[col] === 'object' ? JSON.stringify(u[col]) : u[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-secondary mt-3 text-white" onClick={() => window.location.reload()}>Refrescar</button>
      </div>
    </div>
  );
};

export default Users;
