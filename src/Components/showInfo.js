import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function Homepage() {
  const [data, setData] = useState({
    solver: 0,
    student: 0,
    tasks: 0,
    user: 0,
    status: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${config.baseURL}AllNum`);
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="container mx-auto my-10">
        <h1 className="text-4xl font-semibold text-center my-5">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-20">
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg h-48">
            <h2 className="text-2xl font-bold text-center p-5">Solvers</h2>
            <p className="text-4xl font-semibold text-blue-800 text-center">{data.solver}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center p-5">Students</h2>
            <p className="text-4xl font-semibold text-green-800 text-center">{data.student}</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center p-5">Tasks</h2>
            <p className="text-4xl font-semibold text-yellow-800  text-center">{data.tasks}</p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center p-5">Users</h2>
            <p className="text-4xl font-semibold text-red-800 text-center">{data.user}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Homepage;
