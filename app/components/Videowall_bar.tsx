"use client"
import React from 'react'
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Videowall_bar() {
    const [mapa, setMapa] = useState(false);
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
    <AnimatePresence>
    <div>
        {!mapa && !ayuda && !reservar && (
            <motion.div 
            className='w-[1000px] h-[80px] flex place-content-around rounded-full bg-black bg-opacity-60 text-2xl font-light transition ease-in-out '
            initial={{ opacity: 0, width: '0px'}}
            animate={{ opacity: 1, width: '1000px'}}
            exit={{ width: '0px' }}
            transition={{ duration: 0.5 }}>
                <button onClick={() => setMapa(true)} className="flex flex-row items-center"> 
                    <img src="/videowall/map_icon.png" className="w-[40px]"/>
                    <div className='ml-3'> Mapa </div>
                </button>
                <button onClick={() => setAyuda(true)} className="flex flex-row items-center"> 
                    <img src="/videowall/help_icon.png" className="w-[40px]"/>
                    <div className='ml-3'> Ayuda </div>
                </button>
                <button onClick={() => setReservar(true)} className="flex flex-row items-center"> 
                    <img src="/videowall/reservation_icon.png" className="w-[40px]"/>
                    <div className='ml-3'> Reservar </div>
                </button>
            </motion.div>
        )}

        {!mapa && ayuda && !reservar && (
            <motion.div 
            className="w-[80px] h-[400px] flex flex-col place-content-around rounded-full bg-black bg-opacity-60"
            initial={{ opacity: 0, height: '0px' }}
            animate={{ opacity: 1, height: '400px'}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
                <button onClick={handleMapa} className="place-self-center"> 
                  <img src="/videowall/map_icon.png" className="w-[40px]"/>
                </button>
                <button onClick={() => setAyuda(false)} className="place-self-center"> 
                  <img src="/videowall/help_icon.png" className="w-[40px]"/>
                </button>
                <button onClick={handleReservar} className="place-self-center"> 
                  <img src="/videowall/reservation_icon.png" className="w-[40px]"/>
                </button>
            </motion.div>
        )}

        {mapa && !ayuda && !reservar && (
            <motion.div 
            className='flex flex-row'
            initial={{ opacity: 0, height: '0px' }}
            animate={{ opacity: 1, height: '400px'}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
                <div>
                    <div className="w-[500px] h-[380px] bg-black bg-opacity-60 rounded-xl flex flex-col">
                        <img src="/videowall/map.png" className="p-5 w-[400px] flex self-center"></img>
                        <button onClick={handleClose} className="ml-10 mb-28 "> 
                            <img src="/videowall/close_icon.png" />
                        </button>
                    </div>
                </div>
                <div className="w-0 h-0 
                    border-t-[40px] border-t-transparent
                    border-l-[65px] border-l-black border-opacity-60
                    border-b-[40px] border-b-transparent
                    mt-5">
                </div>
                <div className="w-[80px] h-[400px] flex flex-col place-content-around rounded-full bg-black bg-opacity-60">
                    <button onClick={() => setMapa(false)} className="place-self-center"> 
                        <img src="/videowall/map_icon.png" className="w-[40px]"/>
                    </button>
                    <button onClick={handleAyuda} className="place-self-center"> 
                        <img src="/videowall/help_icon.png" className="w-[40px]"/>
                    </button>
                    <button onClick={handleReservar} className="place-self-center"> 
                        <img src="/videowall/reservation_icon.png" className="w-[40px]"/>
                    </button>
                </div>
                <div className='w-[563px]'/>
            </motion.div>
        )}
    
        {!mapa && !ayuda && reservar && (
            <motion.div 
            className='flex flex-row'
            initial={{ opacity: 0, height: '0px' }}
            animate={{ opacity: 1, height: '400px'}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
                <div className='w-[480px]'/>
                <div className="w-[80px] h-[400px] flex flex-col place-content-around rounded-full bg-black bg-opacity-60">
                    <button onClick={handleMapa} className="place-self-center"> 
                        <img src="/videowall/map_icon.png" className="w-[40px]"/>
                    </button>
                    <button onClick={handleAyuda} className="place-self-center"> 
                        <img src="/videowall/help_icon.png" className="w-[40px]"/>
                    </button>
                    <button onClick={() => setReservar(false)} className="place-self-center"> 
                        <img src="/videowall/reservation_icon.png" className="w-[40px]"/>
                    </button>
                </div>
                    <div className="w-0 h-0 
                    border-t-[50px] border-t-transparent
                    border-r-[75px] border-r-black border-opacity-60
                    border-b-[50px] border-b-transparent mt-72
                    ">
                </div>
                <div className="w-[400px] h-[395px] bg-black bg-opacity-60 rounded-xl flex flex-col">
                    <button onClick={handleClose} className="mt-4 ml-80 "> 
                        <img src="/videowall/close_icon.png" />
                    </button>
                    <img src="/videowall/qr_techwise.png" className="p-5 w-[320px] flex self-center"></img>
                </div>
            </motion.div>
        )}

    </div>
    </AnimatePresence>
  )
}

export default Videowall_bar;

