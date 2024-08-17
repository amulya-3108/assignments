import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "../../config";
import Loader from "../Loader";


import SideBar from "../sidebar";

function HomePageAdmin() 
{
    const [data, setData] = useState({
        solver: 0,
        student: 0,
        tasks: 0,
        user: 0,
        status: 0,
        profit:0
      });
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${config.baseURL}AllNum`);

        console.log(response);
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

    return(
        <div className="flex h-screen">
            <div className="w-64">
                <SideBar />
            </div>
            <div className="flex-6 p-6">
            <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Assignments</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{data.tasks}</p>
</a>

            </div>
            <div className="flex-6 p-6">
            <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Students</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{data.student}</p>
</a>

            </div>
            <div className="flex-6 p-6">
            <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Solver</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{data.solver}</p>
</a>

            </div>

             
            <div className="flex-6 p-6">
            <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">All time Profit</h5>
<p class="font-normal text-green-700 dark:text-gray-400">${data.profit}</p>
</a>

            </div>

            <div className="flex-6 p-6">
            <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Income</h5>
<p class="font-normal text-green-700 dark:text-gray-400">${data.income}</p>
</a>

            </div>


        </div>
      
        
    );

 
}

export default HomePageAdmin;
