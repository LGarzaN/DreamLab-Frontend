"use client"
import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { admin_pruebas } from '@/data/admin_pruebas'

function page() {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = admin_pruebas.filter(item =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const dataToShow = searchTerm.trim() === '' ? admin_pruebas : filteredData;

  return (
    <div className="h-screen">
        <Navbar/>
        <div className="relative w-full">
            <img src="/viewReservations.png" alt="View Reservations" className="w-full h-[30vh] lg:h-[30vh] object-cover brightness-75" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <h1 className="text-4xl lg:text-5xl text-white z-10 pl-20 mt-10">Reservaciones</h1>
            </div>
        </div>

        <div className='w-full flex flex-col justify-center items-center mt-8 '>
            <div className='w-[85vw] flex flex-row'>
                <div className='w-full flex justify-between'>
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre..." 
                        value={searchTerm} 
                        onChange={handleSearch}
                        className='border border-white rounded-xl h-12 md:w-[25vw] w-[80vw] p-2'
                    />

                    <div className= 'hidden sm:block '>
                        Fecha
                    </div>
                    <div className= 'hidden sm:block '>
                        Hora
                    </div>
                    <div className= "hidden sm:block ">
                        Espacio
                    </div>
                    
                </div>
            </div>
        </div>

        <div className='w-full flex flex-col justify-center items-center mt-8 space-y-5'>
            {dataToShow.map((prueba, index) => (
            /*<h1 key={index}>{prueba.area}</h1>*/
            <div className='w-[85vw] h-28 bg-[#293038] rounded-xl flex flex-col md:flex-row md:items-center items-start'>
                    <div className='md:w-[30vw] flex md:flex-col pl-9 space-y-2 justify-center'>
                        <h1 key={index} className='md:text-2xl font-semibold'>{prueba.nombre}</h1>
                        <h2 key={index} className='md:text-xl text-xs'>{prueba.matricula}</h2>
                    </div>
                    <div className='w-[15vw] flex flex-col space-y-2'>
                        <h1 key={index} className='text-xl'> {prueba.dia} </h1>
                        <h2 className='text-2xl font-semibold'> {prueba.fecha} </h2>
                    </div>
                    <div className='w-[20vw] flex flex-col text-center'>
                        <h1 key={index} className='text-xl'> {prueba.hora_inicio}</h1>
                        <h1 key={index} className='text-xl mt-[-6px] mb-[-6px]'> - </h1>
                        <h1 key={index} className='text-xl'> {prueba.hora_fin} </h1>
                    </div>
                    <div className='w-[15vw] flex flex-col space-y-2 ml-7'>
                        <h1 key={index} className='text-2xl font-semibold'> {prueba.area} </h1>
                        <h2 key={index} className='text-xl'> {prueba.espacio} </h2>
                    </div>
                </div>
            ))}
        </div>
        


    </div>
  )
}

export default page
