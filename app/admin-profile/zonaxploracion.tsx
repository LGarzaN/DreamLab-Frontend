import React from 'react'
import UsoEspacios from './components/UsoEspacios';
import HorasPico from './components/HorasPicos';
import ReservasCanceladas from './components/ReservasCanceladas';
import ReservasTardias from './components/ReservarTardias';
import ReservasRealizadas from './components/ReservasRealizadas';
import CantidadArea from './components/CantidadArea';

function ZonaXploracion() {
  return (
    <div className='w-[80vw] h-full flex flex-col justify-around place-content-around'>
        
        <div className="flex md:flex-row justify-between mb-4">

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasCanceladas data = {[{ name: 'Group A', value: 12 },{ name: 'Group B', value: 88 }]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasTardias data = {[{ name: 'Group A', value: 80}, { name: 'Group B', value: 20}]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasRealizadas data ={[{ name: 'Group A', value: 80 },{ name: 'Group B', value: 20 }]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <CantidadArea data={[{ name: 'ITC', value: 10 },{ name: 'ITD', value: 40 },{ name: 'IRS', value: 50 }]}/>
            </div>

        </div>

        <div className="flex md:flex-row justify-between mt-4">

            <div className='w-[45vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <UsoEspacios data={[{ Cantidad: 25, Espacio: "HB" },{ Cantidad: 30, Espacio: "TL" },{ Cantidad: 15, Espacio: "WH" },{ Cantidad: 27, Espacio: "BF" },{ Cantidad: 33, Espacio: "BD" }, { Cantidad: 16, Espacio: "OI" }]}/>
            </div>

            <div className='w-[33vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <HorasPico data={[{ hora: 10, date: "Lun" },{ hora: 11, date: "Mar" },{ hora: 14, date: "Mie" },{ hora: 17, date: "Jue" },{ hora: 14, date: "Vie" }]}/>
            </div>

        </div>

    </div>
  )
}

export default ZonaXploracion
