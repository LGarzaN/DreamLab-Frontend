import React from 'react';
import BarChart from '../components/BarChart';
import DoughnutChart from '../components/DoughnutChart';
import ReservasCanceladas from './components/ReservasCanceladas';
import HorasPico from './components/HorasPicos';
import UsoEspacios from './components/UsoEspacios';

function general() {
    

  return (
    <div className='flex flex-col'>
      <div className='flex md:flex-row justify-around'>

        <div className='w-[25vw] h-[360px] bg-[#293038] m-4 flex flex-col items-center justify-center text-center rounded-xl'>
            <div className='w-[22vw]'>
            <ReservasCanceladas/>
            </div>
            
            
        </div>

        <div className="w-[25vw] bg-[#293038] m-4 flex flex-col items-center justify-center text-center rounded-xl">
            Chart2   
        </div>

        <div className="w-[25vw] bg-[#293038] m-4 flex flex-col items-center justify-center text-center rounded-xl">
            Chart 2
        </div>

      </div>

      <div className='flex md:flex-row justify-around'>

        <div className='w-[40vw] bg-[#293038] m-4 flex flex-col items-center justify-center text-center rounded-xl'>
            <UsoEspacios/>
        </div>

        <div className='w-[40vw] bg-[#293038] m-4 flex flex-col items-center justify-center text-center rounded-xl'>
            <HorasPico/>
        </div>

      </div>
    </div>
  )
}

export default general
