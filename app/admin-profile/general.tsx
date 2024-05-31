"use client"
import React from 'react'
import UsoEspacios from './components/UsoEspacios';
import HorasPico from './components/HorasPicos';
import ReservasCanceladas from './components/ReservasCanceladas';
import ReservasTardias from './components/ReservarTardias';
import ReservasRealizadas from './components/ReservasRealizadas';
import CantidadArea from './components/CantidadArea';
import { useEffect, useState } from 'react';
import axios from "axios";

interface Abreviaciones {
    [key: string]: string;
}

function abreviacionesAreas(data: { [key: string]: number }[]) {
    const abreviaciones: Abreviaciones = {
        "1": "SN",
        "2": "LR",
        "3": "EG",
        "4": "DF",
        "5": "NH",
        "6": "DN",
        "7": "GY",
        "8": "PCB",
        "9": "TM",
        "10": "HB",
        "11": "TL",
        "12": "WH",
        "13": "BF",
        "14": "BD",
        "15": "OIL",
    };

    const keys = data.map(objeto => Object.keys(objeto)[0]);
    return keys.map(elemento => abreviaciones[elemento]);
}

function general() {
    const [dataUsoEspacios, setDataUsoEspacios] = useState([]);

    useEffect(() => {
        axios.get('/api/adminreservations/usoespacios_g')
        .then((response) => {
            setDataUsoEspacios(response.data)

            // setPendingReservations(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const valoresNumericos = dataUsoEspacios.map(objeto => {
        const [clave, valor] = Object.entries(objeto)[0];
        return valor;
    });
    
    const abreviaciones = abreviacionesAreas(dataUsoEspacios);
  return (
    <div className='w-[80vw] h-full flex flex-col justify-around place-content-around'>
        
        <div className="flex md:flex-row justify-between mb-4">

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasCanceladas data = {[{ name: 'Group A', value: 35 },{ name: 'Group B', value: 65 }]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasTardias data = {[{ name: 'Group A', value: 50}, { name: 'Group B', value: 50}]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <ReservasRealizadas data ={[{ name: 'Group A', value: 50 },{ name: 'Group B', value: 50 }]}/>
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <CantidadArea data={[{ name: 'ITC', value: 60 },{ name: 'ITD', value: 15 },{ name: 'IRS', value: 25 }]}/>
            </div>

        </div>

        <div className="flex md:flex-row justify-between mt-4">

            <div className='w-[45vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <UsoEspacios data={[{ Cantidad: Number(valoresNumericos[0]), Espacio: abreviaciones[0] },{ Cantidad: Number(valoresNumericos[1]), Espacio: abreviaciones[1] },{ Cantidad:  Number(valoresNumericos[2]), Espacio: abreviaciones[2] },{ Cantidad:  Number(valoresNumericos[3]), Espacio: abreviaciones[3] },{ Cantidad:  Number(valoresNumericos[4]), Espacio: abreviaciones[4] }]}/>
            </div>

            <div className='w-[33vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
                <HorasPico data={[{ hora: 15, date: "Lun" },{ hora: 12, date: "Mar" },{ hora: 17, date: "Mie" },{ hora: 11, date: "Jue" },{ hora: 12, date: "Vie" }]}/>
            </div>

        </div>

    </div>
  )
}

export default general
