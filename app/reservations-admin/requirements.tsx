"use client";
import React from "react";
import { requirements_data, requirements_area } from "@/data/requirements_data";
import { useState, useEffect } from "react";

function obtenerRequerimientosPorArea(idArea: number) {
  const area = requirements_area.find((area) => area.id_area === idArea);

  if (area) {
    const requerimientos = requirements_data.filter((requerimiento) =>
      area.ids_requirements.includes(requerimiento.id)
    );
    return requerimientos;
  } else {
    return [];
  }
}

function RequirementsChooser(
  date: string,
  start: number,
  end: number,
  requirements: string,
  setRequirements: any,
  matricula: string,
  setMatricula: any,
) {
  const requirements_data_especifics = obtenerRequerimientosPorArea(1);
  const [numerosRequerimientos, setNumerosRequerimientos] = useState<Record<number, number>>({});
  const [user, setUser] = useState("");

  const handleUserChange = (e: any) => {
    setUser(e.target.value);
  };

  const handlMatriculaChange = (e: any) => {
    setMatricula(e.target.value);
  };

  const handleIncrement = (id: number) => {
    setNumerosRequerimientos((prevState) => ({
      ...prevState,
      [id]: (prevState[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: number) => {
    setNumerosRequerimientos((prevState) => ({
      ...prevState,
      [id]: (prevState[id] || 0) - 1,
    }));
  };

  const handleFinalResult = () => {
    let result = "";
    for (const id in numerosRequerimientos) {
      if (numerosRequerimientos[id] > 0) {
        result += `${id}=${numerosRequerimientos[id]}, `;
      }
    }
    console.log(result.slice(0, -2));
  };
  return (
    <div className="h-[40vh] mt-8">
      <div className="flex flex-col items-center">
        <section className="text-center text-2xl md:text-4xl lg:text-4xl mb-8">
          <p className="font-semibold">{date}</p>
          <p className="font-light">
            {start}:00 a {end}:00
          </p>
        </section>

        <div className=" flex flex-row justify-evenly space-x-6">
          <input
            id="username"
            type="text"
            className="w-[40vw] h-16 border-[0.5px] border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user}
            onChange={handleUserChange}
            placeholder="Introduce el nombre del Responsable"
          />
          <input
            id="matricula"
            type="text"
            className="w-[40vw] h-16 border-[0.5px] border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={matricula}
            onChange={handlMatriculaChange}
            placeholder="Introduce la Matricula del Responsable"
          />
      
        </div>
         

        <section className="flex justify-evenly w:full lg:flex-row flex-col">
          
          {requirements_data_especifics.map((item) => (
            <div key={item.id} className="h-28 w-[90vw] lg:w-[40vw] bg-[#16191C] rounded-xl flex items-center	m-4 justify-evenly">
              <img
                src={item.image}
                alt="descripcion"
                className="lg:w-20 w-10 mr-4 ml-10"
              />
              <h1 className="lg:ml-4 text-2xl ">{item.name}</h1>

              <div className="lg:w-28 w-20 h-20 bg-[#293038]  rounded-xl ml-8 flex flex-row">
                <div className="w-16 h-full flex items-center justify-center">
                  <h1 className="text-2xl">
                    {numerosRequerimientos[item.id] || 0}
                  </h1>
                </div>
                <div className="flex flex-col h-full lg:w-12 w-8 items-center justify-even">
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="lg:w-12 w-8 h-full bg-[#3F4954] hover:bg-[#1E2328] flex items-center justify-center rounded-tr-xl"
                  >
                    <img src="/requirements/up.png" className="lg:w-6 w-4" />
                  </button>
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="lg:w-12 w-8 h-full bg-[#3F4954] hover:bg-[#1E2328] flex items-center justify-center rounded-br-xl"
                  >
                    <img src="/requirements/down.png" className="lg:w-6 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default RequirementsChooser;
