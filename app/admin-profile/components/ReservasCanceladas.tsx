"use client"
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Text} from 'recharts';

export default function ReservasCanceladas() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server side
  }

  const data = [
    { name: 'Group A', value: 35 },
    { name: 'Group B', value: 65 }
  ];
  const COLORS = ['#605AD6', '#D9D9D9'];

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='mt-4 font-light text-xl'>Reservaciones Canceladas</h1>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey={"value"}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={7}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
