"use client"
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Text} from 'recharts';

type DataProp = {
  data: {
      name: string
      value: number
  }[]
}


export default function CantidadArea({data}: DataProp) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server side
  }
  const COLORS = ['#F2933A', '#F2D53A', "#FF0A0A"];

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='mt-4 font-light text-xl'>Reservaciones Canceladas</h1>

      <div className='flex flex-row items-center mb-3'>
        <div className='w-3/4 flex flex-col'>
            <div className='flex flex-row'> {data[0].name} -  <h1 className='text-[#F2933A]'> <span style={{ marginRight: '0.5em' }}/>{data[0].value}% <br/> </h1> </div>
            <div className='flex flex-row'> {data[1].name} -  <h1 className='text-[#F2D53A]'> <span style={{ marginRight: '0.5em' }}/>{data[1].value}% <br/> </h1> </div>
            <div className='flex flex-row'> {data[2].name} -  <h1 className='text-[#FF0A0A]'> <span style={{ marginRight: '0.5em' }}/>{data[2].value}% <br/> </h1> </div>
        
        </div>
        <div className='w-3/4'>
        <PieChart width={100} height={100}>
          <Pie
            data={data}
            dataKey={"value"}
            innerRadius={20}
            outerRadius={40}
            paddingAngle={15}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        </div>
      </div>
    </div>
  );
}
