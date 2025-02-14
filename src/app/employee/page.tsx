'use client';

import React, { useEffect, useState } from 'react';

const EmployeePage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the employee name from sessionStorage
    const name = sessionStorage.getItem('userName');
    if (name) {
      setUserName(name); // Set the userName if available
    } else {
      console.error('User name not found in sessionStorage');
    }
  }, []);

  if (!userName) {
    return <div>Loading...</div>; // Or show login page if no user is logged in
  }

  return (
    <div className="container mx-auto p-4">
      <h1>Welcome, Employee!</h1> {/* Display the user name */}
    </div>
  );
};

export default EmployeePage;
