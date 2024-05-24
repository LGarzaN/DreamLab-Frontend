import React from 'react'
import UsoEspacios from './components/UsoEspacios';
import HorasPico from './components/HorasPicos';
import ReservasCanceladas from './components/ReservasCanceladas';
import ReservasTardias from './components/ReservarTardias';
import ReservasRealizadas from './components/ReservasRealizadas';
import CantidadArea from './components/CantidadArea';

function general() {
  return (
    <div className='w-[80vw] h-full flex flex-col justify-around place-content-around'>
        
        <div className="flex md:flex-row justify-between mb-4">

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasCanceladas/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasTardias/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasRealizadas/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <CantidadArea/>
            </div>

        </div>

        <div className="flex md:flex-row justify-between mt-4">

            <div className='w-[45vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <UsoEspacios/>
            </div>

            <div className='w-[33vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <HorasPico/>
            </div>

        </div>

    </div>
  )
}

export default general
