"use client"
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Text} from 'recharts';

type DataProp = {
    data: {
        name: string
        value: number
    }[]
}

export default function ReservasTardias({data}: DataProp) {

  const COLORS = ['#2194D4', '#D9D9D9'];

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='mt-4 font-light text-xl'>Reservaciones Tardias</h1>

      <div className='flex flex-row items-center mb-3'>
        <div className='w-1/4 flex flex-row'>
          {data[0].value}%
        </div>
        <div className='w-3/4'>
        <PieChart width={110} height={100}>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            cy="70%"
            dataKey={"value"}
            innerRadius={30}
            outerRadius={50}
            paddingAngle={7}
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
