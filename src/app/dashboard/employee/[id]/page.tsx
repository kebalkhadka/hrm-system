"use client"; // Ensure the component is client-side

import { useState, useEffect } from "react";

const EmployeeDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Access dynamic params from the URL

  const [employee, setEmployee] = useState<any>(null); // State to hold employee data
  const [attendance, setAttendance] = useState<any>(null); // State to hold attendance data
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (!id) return; // If there's no ID, return early to prevent errors

    const fetchEmployeeData = async () => {
      try {
        const employeeResponse = await fetch(`/api/employee/${id}`);
        const employeeData = await employeeResponse.json();
        setEmployee(employeeData);

        const attendanceResponse = await fetch(`/api/attendance/${id}`);
        const attendanceData = await attendanceResponse.json();
        setAttendance(attendanceData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]); // Run the effect when `id` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>No employee found</div>;
  }

  return (
    <div>
      <h1>Employee Details</h1>
      <p>Name: {employee.name}</p>
      <p>Email: {employee.email}</p>
      <p>Department: {employee.department}</p>
      <p>Role: {employee.role}</p>

      <h2>Attendance</h2>
      <ul>
        {attendance?.map((entry: any, index: number) => (
          <li key={index}>
            {entry.date}: {entry.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDetails;
