"use client";
import React from 'react'
import UsoEspacios from './components/UsoEspacios';
import HorasPico from './components/HorasPicos';
import ReservasCanceladas from './components/ReservasCanceladas';
import ReservasTardias from './components/ReservarTardias';
import ReservasRealizadas from './components/ReservasRealizadas';
import CantidadArea from './components/CantidadArea';
import { useEffect, useState } from 'react';



interface DataGeneral {
    [key: string]: number;
  }

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

interface GraficasProps {
    data1: { [key: string]: number }[];
    data2: { [key: string]: number }[];
  }

export default function Graficas({ data1, data2 }: GraficasProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data1.length > 0 && data2.length > 0) {
          setLoading(false);
        }
      }, [data1, data2]);

    const valoresNumericos = data1.map(objeto => {
        const [clave, valor] = Object.entries(objeto)[0];
        return valor;
    });

    const valoresNumericos2 = data2.map((objeto: DataGeneral) => {
        const [clave, valor] = Object.entries(objeto)[0];
        return valor;
      });
    
    const abreviaciones = abreviacionesAreas(data1);

  return (
    <div className='w-[80vw] h-full flex flex-col justify-around place-content-around'>
        
        <div className="flex md:flex-row justify-between mb-4">
            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
            {loading ? (
                <div>Esperando...</div>
                ) : (
                <ReservasCanceladas
                    data={[
                    { name: 'Group A', value: Number(valoresNumericos2[1]) },
                    { name: 'Group B', value: Number(valoresNumericos2[0]) }
                    ]}
                />
                )}
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
            {loading ? (
                <div>Cargando...</div>
                ) : (
                <ReservasTardias data = {[{ name: 'Group A', value: 50}, { name: 'Group B', value: 50}]}/>
                )}
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
            {loading ? (
                <div>Cargando...</div>
                ) : (
                <ReservasRealizadas data ={[{ name: 'Group A', value: Number(valoresNumericos2[3]) },{ name: 'Group B', value: Number(valoresNumericos2[2]) }]}/>
                )}
            </div>

            <div className='w-[19vw] h-[17vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
            {loading ? (
                <div>Cargando...</div>
                ) : (
                <CantidadArea data={[{ name: 'ITC', value: Number(valoresNumericos2[4]) },{ name: 'ITD', value: Number(valoresNumericos2[5]) },{ name: 'IRS', value: Number(valoresNumericos2[6]) }]}/>
                )}
            </div>

        </div>

        <div className="flex md:flex-row justify-between mt-4">

            <div className='w-[45vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
            {loading ? (
                <div>Cargando...</div>
                ) : (
                <UsoEspacios data={[{ Cantidad: Number(valoresNumericos[0]), Espacio: abreviaciones[0] },{ Cantidad: Number(valoresNumericos[1]), Espacio: abreviaciones[1] },{ Cantidad:  Number(valoresNumericos[2]), Espacio: abreviaciones[2] },{ Cantidad:  Number(valoresNumericos[3]), Espacio: abreviaciones[3] },{ Cantidad:  Number(valoresNumericos[4]), Espacio: abreviaciones[4] }]}/>
                )}
            </div>

            <div className='w-[33vw] h-[47vh] flex bg-[#293038] items-center justify-center text-center rounded-xl'>
            {loading ? (
                <div>Cargando...</div>
                ) : (
                <HorasPico data={[{ hora: 15, date: "Lun" },{ hora: 12, date: "Mar" },{ hora: 17, date: "Mie" },{ hora: 11, date: "Jue" },{ hora: 12, date: "Vie" }]}/>
                )}
            </div>

        </div>

    </div>
  )
}