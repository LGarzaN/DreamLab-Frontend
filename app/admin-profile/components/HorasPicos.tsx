"use client"
import React from 'react'
import {Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
import { useEffect, useState } from 'react';


type DataProp = {
  data: {
      hora: number
      date: string
  }[]
}
export default function HorasPico({data}: DataProp) {
  const [loading, setLoading] = useState(true);

  return (
    <div className='w-[40vw]'>
         <h1 className='mt-4 font-light text-xl'>Horas Pico</h1>
        <ResponsiveContainer width="90%" height={300}>
        <LineChart data={data} className='ml-2 p-1' >
            <XAxis dataKey="date" stroke='white' padding={{ left: 30, right: 30 }}/>
            <YAxis dataKey="hora"  domain={[10, 18]} stroke='white' />
            <Tooltip offset={20}/>
            <Line dataKey="hora" stroke='#57974E' strokeWidth={2} dot={{ stroke: '#57974E', strokeWidth: 7, r: 1,strokeDasharray:''}}/>
        </LineChart>
        </ResponsiveContainer>
    </div>
  )
}
