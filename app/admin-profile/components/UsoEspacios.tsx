"use client"
import React from 'react'
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip} from 'recharts'
import { useEffect, useState } from 'react'

type DataProp = {
  data: {
      Cantidad: number
      Espacio: string
  }[]
}

export default function UsoEspacios({data}: DataProp) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <div>Esperando...</div>;
  }

  const barColors = ["#00B1E9", "#FF0A0A", "#36C255", "#F2D53A", "#981CD2"]

  return (
    <div>
      <h1 className='mt-4 font-light text-xl'>Uso de Espacios</h1>
      <ResponsiveContainer width={400} height={300}>
        <BarChart data={data}>
            <XAxis dataKey="Espacio" stroke='white' padding={{ left: 10}}/>
            <YAxis dataKey="Cantidad"  domain={[0, 10]} stroke='white' />
            <Tooltip offset={20}/>
            <Bar dataKey="Cantidad" fill="#8884d8"  barSize={40}> 
            {
                data.map((entry, index) => {
                    const color = barColors[index]
                    return <Cell fill={color} />;
                })
            }
            </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
