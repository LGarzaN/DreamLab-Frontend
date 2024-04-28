"use client";
import React from "react";
import { useState } from "react";

function page() {
  const [mapa, setMapa] = useState(true);
  const [ayuda, setAyuda] = useState(false);
  const [reservar, setReservar] = useState(false);

  const handleMapa = () => {
    setMapa(true);
    setAyuda(false);
    setReservar(false);
  };

  const handleAyuda = () => {
    setMapa(false);
    setAyuda(true);
    setReservar(false);
  };

  const handleReservar = () => {
    setMapa(false);
    setAyuda(false);
    setReservar(true);
  };

  const handleClose = () => {
    setMapa(false);
    setAyuda(false);
    setReservar(false);
  };

  return (
    <div>
      <div className="h-[1080px] w-[200vw] bg-gradient-to-r from-[#233363] to-[#4AA0BF] flex flex-row ">
        {" "}
        {/*h-[1080px] w-[1920px]*/}
        <section className="w-[50vw]  border border-indigo-500 items-start">
          {/*w-[960px]*/}
          <h1 className="m-20 font-bold text-4xl">Próximas reservaciones</h1>
        </section>
        <section className="w-[100vw]  border border-indigo-500 flex flex-col items-center">
          {/*w-[960px]*/}

          {!mapa && !ayuda && !reservar && (
            <div className="w-[80vw] h-[80px] mt-auto mb-20 transition flex place-content-around rounded-full bg-black bg-opacity-50">
              <button onClick={() => setMapa(true)} className="flex flex-row"> 
                <img src="/videowall/map_icon.png" className="w-[40px]"/>mapa 
              </button>
              <button onClick={() => setAyuda(true)}> ayuda </button>
              <button onClick={() => setReservar(true)}> reservar </button>
            </div>
          )}

          {mapa && !ayuda && !reservar && (
            <div className="flex flex-row mt-auto mb-20">
              <div className="w-[400px]">
                <img src="/videowall/map.png"></img>
              </div>
              <div className="w-[80px] h-[400px] mt-auto mb-20 transition flex flex-col place-content-around rounded-full bg-black bg-opacity-50">
                <button onClick={handleClose}> X </button>
                <button onClick={() => setMapa(false)} className="place-self-center"> 
                  <img src="/videowall/map_icon.png" className="w-[40px]"/>
                </button>
                <button onClick={handleAyuda} className="place-self-center"> 
                  <img src="/videowall/help_icon.png" className="w-[40px]"/>
                </button>
                <button onClick={handleReservar}> reservar </button>
              </div>
              <div className="w-[550px]"></div>
            </div>
          )}

          {!mapa && ayuda && !reservar && (
            <div className="flex flex-row mt-auto mb-20">
              <div className="w-[80px] h-[400px] mt-auto mb-20 transition flex flex-col place-content-around rounded-full bg-black bg-opacity-50">
                <button onClick={handleClose}> X </button>
                <button onClick={() => setMapa(false)} className="place-self-center"> 
                  <img src="/videowall/map_icon.png" className="w-[40px]"/>
                </button>
                <button onClick={() => setAyuda(false)}> ayuda </button>
                <button onClick={handleReservar}> reservar </button>
              </div>
              Llamando a alguien
            </div>
          )}

          {!mapa && !ayuda && reservar && (
            <div className="flex flex-row mt-auto mb-20">
              Reservar
              <div className="w-[80px] h-[400px] mt-auto mb-20 transition flex flex-col place-content-around rounded-full bg-black bg-opacity-50">
                <button onClick={handleClose}> X </button>
                <button onClick={() => setMapa(false)} className="place-self-center"> 
                  <img src="/videowall/map_icon.png" className="w-[40px]"/>
                </button>
                <button onClick={handleAyuda}> ayuda </button>
                <button onClick={() => setReservar(false)}> reservar </button>
              </div>
            </div>
          )}
        </section>
        <section className="w-[50vw]  border border-indigo-500 items-start">
          {/*w-[960px]*/}
          <h1 className="m-20 font-bold text-4xl">Próximas reservaciones</h1>
        </section>
      </div>
    </div>
  );
}

export default page;
