// app/dashboard/employee/[id]/page.tsx

'use client';  // Add this to mark this component as a client component

import CalendarWithAttendance from '@/app/components/Calender';
import React, { useEffect, useState } from 'react';

const EmployeeDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [employee, setEmployee] = useState<any>(null); // State to hold employee data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch employee data when the component mounts
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`/api/employee/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        setError('Error fetching employee details');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]); // Re-run when `id` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Employee Details</h1>
      {employee ? (
        <div>
          <p>Name: {employee.name}</p>
          <p>Email: {employee.email}</p>
          <p>Role: {employee.role}</p>
          {/* You can display more details here */}
          {/* <CalendarWithAttendance employeeId={params.id}/> */}
        </div>
      ) : (
        <p>Employee not found</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
