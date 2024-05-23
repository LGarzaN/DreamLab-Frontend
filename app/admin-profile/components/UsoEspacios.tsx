"use client"
import React from 'react'
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis } from 'recharts'
export default function UsoEspacios() {
    const data = [
        { Cantidad: 45, Espacio: "LR" },
        { Cantidad: 20, Espacio: "EG" },
        { Cantidad: 25, Espacio: "DF" },
        { Cantidad: 40, Espacio: "NH" },
        { Cantidad: 25, Espacio: "DN" }
    ]

    const barColors = ["#00B1E9", "#FF0A0A", "#36C255", "#F2D53A", "#981CD2"]

  return (
    <div>
      <h1 className='mt-4 font-light text-xl'>Uso de Espacios</h1>
      <ResponsiveContainer width={400} height={400} className="mr-10">
        <BarChart data={data}>
            <XAxis dataKey="Espacio" stroke='white' padding={{ left: 10}}/>
            <YAxis dataKey="Cantidad"  domain={[0, 50]} stroke='white' />
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
