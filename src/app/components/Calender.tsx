'use client';

import React, { useEffect, useState } from 'react';

// Utility function to get the first and last date of the current month
const getFirstAndLastDate = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { firstDay, lastDay };
};

const CalendarWithAttendance = ({ employeeId }: { employeeId: string }) => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(`/api/attendance/${employeeId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        const data = await response.json();
        console.log(data);
        setAttendance(data); // Store attendance data in state
      } catch (error) {
        setError("Error fetching attendance data");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [employeeId]);

  if (loading) {
    return <div>Loading calendar...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Get the current month's first and last dates
  const { firstDay, lastDay } = getFirstAndLastDate(currentDate);

  // Map through the days of the month
  const daysInMonth = [];
  for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
    daysInMonth.push(new Date(day)); // Create an array of all dates in the month
  }

  // Prepare attendance data to map by day
  const attendanceByDate: Record<string, any> = {};
  attendance.forEach((attend: any) => {
    const date = new Date(attend.checkIn).toLocaleDateString(); // Format to just the date part
    attendanceByDate[date] = attend; // Store attendance by date
  });

  return (
    <div>
      <h2>Attendance Calendar</h2>
      <div className="grid grid-cols-7 gap-4">
        {daysInMonth.map((day) => {
          const formattedDate = day.toLocaleDateString();

          return (
            <div
              key={formattedDate}
              className={`p-4 border ${attendanceByDate[formattedDate] ? 'bg-green-200' : 'bg-gray-100'}`}
            >
              <p>{day.getDate()}</p>
              {attendanceByDate[formattedDate] ? (
                <div>
                  <p>Check-In: {new Date(attendanceByDate[formattedDate].checkIn).toLocaleTimeString()}</p>
                  <p>Check-Out: {attendanceByDate[formattedDate].checkOut ? new Date(attendanceByDate[formattedDate].checkOut).toLocaleTimeString() : 'N/A'}</p>
                </div>
              ) : (
                <p>No attendance data</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWithAttendance;
