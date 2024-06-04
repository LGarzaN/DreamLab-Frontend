import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

type DataProp = {
  data: {
    name: string;
    value: number;
  }[];
};

export default function CantidadArea({ data }: DataProp) {
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

  const COLORS = ['#F2933A', '#F2D53A', '#FF0A0A'];

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='mt-4 font-light text-xl'>Carreras x Reservaciones</h1>

      <div className='flex flex-row items-center mb-3'>
        <div className='w-3/4 flex flex-col'>
          {data.map((item, index) => (
            <div className='flex flex-row' key={index}>
              {item.name} -{' '}
              <h1 className={`text-${COLORS[index]}`}>
                <span style={{ marginRight: '0.5em' }} />
                {item.value}
                <br />
              </h1>{' '}
            </div>
          ))}
        </div>
        <div className='w-3/4'>
          <PieChart width={100} height={100}>
            <Pie
              data={data}
              dataKey='value'
              innerRadius={20}
              outerRadius={40}
              paddingAngle={15}
              stroke='none'
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
