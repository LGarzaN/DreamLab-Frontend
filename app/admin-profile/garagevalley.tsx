import React from 'react'
import UsoEspacios from './components/UsoEspacios';
import HorasPico from './components/HorasPicos';
import ReservasCanceladas from './components/ReservasCanceladas';
import ReservasTardias from './components/ReservarTardias';
import ReservasRealizadas from './components/ReservasRealizadas';
import CantidadArea from './components/CantidadArea';

function GarageValley() {
  return (
    <div className='w-[80vw] h-full flex flex-col justify-around place-content-around'>
        
        <div className="flex md:flex-row justify-between mb-4">

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasCanceladas data = {[{ name: 'Group A', value: 15 },{ name: 'Group B', value: 85 }]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasTardias data = {[{ name: 'Group A', value: 40}, { name: 'Group B', value: 60}]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasRealizadas data ={[{ name: 'Group A', value: 40 },{ name: 'Group B', value: 60 }]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <CantidadArea data={[{ name: 'ITC', value: 50 },{ name: 'ITD', value: 30 },{ name: 'IRS', value: 20 }]}/>
            </div>

        </div>

        <div className="flex md:flex-row justify-between mt-4">

            <div className='w-[45vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <UsoEspacios data={[{ Cantidad: 20, Espacio: "EG" },{ Cantidad: 10, Espacio: "DF" },{ Cantidad: 12, Espacio: "NH" },{ Cantidad: 8, Espacio: "DN" },{ Cantidad: 6, Espacio: "GY" }, { Cantidad: 4, Espacio: "PCB"},{ Cantidad: 9, Espacio: "TM" }]}/>
            </div>

            <div className='w-[33vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <HorasPico data={[{ hora: 15, date: "Lun" },{ hora: 12, date: "Mar" },{ hora: 17, date: "Mie" },{ hora: 11, date: "Jue" },{ hora: 12, date: "Vie" }]}/>
            </div>

        </div>

    </div>
  )
}

export default GarageValley
