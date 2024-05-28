import React from 'react'
import UsoEspacios from './components/UsoEspacios';
import HorasPico from './components/HorasPicos';
import ReservasCanceladas from './components/ReservasCanceladas';
import ReservasTardias from './components/ReservarTardias';
import ReservasRealizadas from './components/ReservasRealizadas';
import CantidadArea from './components/CantidadArea';

function EspaciosAbiertos() {
  return (
    <div className='w-[80vw] h-full flex flex-col justify-around place-content-around'>
        
        <div className="flex md:flex-row justify-between mb-4">

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasCanceladas data = {[{ name: 'Group A', value: 30 },{ name: 'Group B', value: 70 }]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasTardias data = {[{ name: 'Group A', value: 30}, { name: 'Group B', value: 70}]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasRealizadas data ={[{ name: 'Group A', value: 80 },{ name: 'Group B', value: 20 }]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <CantidadArea data={[{ name: 'ITC', value: 80 },{ name: 'ITD', value: 15 },{ name: 'IRS', value: 5 }]}/>
            </div>

        </div>

        <div className="flex md:flex-row justify-between mt-4">

            <div className='w-[45vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <UsoEspacios data={[{ Cantidad: 45, Espacio: "LR" },{ Cantidad: 15, Espacio: "SC" }]}/>
            </div>

            <div className='w-[33vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <HorasPico data={[{ hora: 16, date: "Lun" },{ hora: 10, date: "Mar" },{ hora: 15, date: "Mie" },{ hora: 17, date: "Jue" },{ hora: 12, date: "Vie" }]}/>
            </div>

        </div>

    </div>
  )
}

export default EspaciosAbiertos
