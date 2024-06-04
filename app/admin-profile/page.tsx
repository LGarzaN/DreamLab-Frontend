"use client"
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Tabs, Box, Text } from "@radix-ui/themes";
import axios from "axios";
import Graficas from "./general";
import Excel from "./components/Excel";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<{ username: string; name: string; priority: number, profile_picture: string}>({ 
        username: "", 
        name: "", 
        priority: 0,
        profile_picture: ""
    });
    const [dataUsoEspaciosGeneral, setDataUsoEspaciosGeneral] = useState([]);
    const [dataUsoEspaciosAbiertos, setDataUsoEspaciosAbiertos] = useState([]);
    const [dataUsoEspaciosGarage, setDataUsoEspaciosGarage] = useState([]);
    const [dataUsoEspaciosExploracion, setDataUsoEspaciosExploracion] = useState([]);
    const [datosGenerales, setDatosGeneral] = useState([]);
    const [datosAbiertos, setDatosAbiertos] = useState([]);
    const [datosGarage, setDatosGarage] = useState([]);
    const [datosExploracion, setDatosExploracion] = useState([]);

    useEffect(() => {
        const fetchProfileData = async () => {
        try {
            const response = await fetch('/api/profile');
            if (response.ok) {
            const data = await response.json();
            setUserData(data.usuario);
            } else {
            throw new Error('Failed to fetch profile data');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to fetch profile data');
        } finally {
            setLoading(false);
        }
        };

        fetchProfileData();

        axios.get('/api/adminreservations/usoespacios_general')
        .then((response) => {
            setDataUsoEspaciosGeneral(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get('/api/adminreservations/datos_general')
        .then((response) => {
            setDatosGeneral(response.data)
            setLoading(false)
            
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get('/api/adminreservations/usoespacios_abiertos')
        .then((response) => {
            setDataUsoEspaciosAbiertos(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get('/api/adminreservations/datos_abiertos')
        .then((response) => {
            setDatosAbiertos(response.data)
            setLoading(false)
            
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get('/api/adminreservations/usoespacios_garage')
        .then((response) => {
            setDataUsoEspaciosGarage(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get('/api/adminreservations/datos_garage')
        .then((response) => {
            setDatosGarage(response.data)
            setLoading(false)
            
        })
        .catch((error) => {
            console.log(error)
        })
        axios.get('/api/adminreservations/usoespacios_exploracion')
        .then((response) => {
            setDataUsoEspaciosExploracion(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get('/api/adminreservations/datos_exploracion')
        .then((response) => {
            setDatosExploracion(response.data)
            setLoading(false)
            
        })
        .catch((error) => {
            console.log(error)
        })
    }, []);

    return (
    <div>
        <Navbar />

        <section className="relative pt-40 pb-24">
            <img src="/techimg.png" alt="cover-image" className="w-full absolute top-0 left-0 z-0 h-60 md:h-[40vh] object-cover"/>
            <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
                    <img src="/profilepic.jpeg" alt="user-image" className="border-4 border-solid border-white md:w-[200px] md:h-[200px] rounded-full h-32 w-32"/>
                </div>
                <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
                    <div className="block">
                        <h3 className="font-bold text-4xl text-white mb-1">Luis Garza</h3>
                        <p className="font-normal text-base leading-7 text-gray-500">luisgarzan@tec.mx</p>
                    </div>
                    <button
                        className="rounded-full py-3.5 px-5 bg-gray-100 flex items-center group transition-all duration-500 hover:bg-indigo-100 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path className="stroke-gray-700 transition-all duration-500 group-hover:stroke-indigo-600"
                                d="M14.1667 11.6666V13.3333C14.1667 14.9046 14.1667 15.6903 13.6785 16.1785C13.1904 16.6666 12.4047 16.6666 10.8333 16.6666H7.50001C5.92866 16.6666 5.14299 16.6666 4.65483 16.1785C4.16668 15.6903 4.16668 14.9047 4.16668 13.3333V11.6666M16.6667 9.16663V13.3333M11.0157 10.434L12.5064 9.44014C14.388 8.18578 15.3287 7.55861 15.3287 6.66663C15.3287 5.77466 14.388 5.14749 12.5064 3.89313L11.0157 2.8993C10.1194 2.3018 9.67131 2.00305 9.16668 2.00305C8.66205 2.00305 8.21393 2.3018 7.31768 2.8993L5.82693 3.89313C3.9454 5.14749 3.00464 5.77466 3.00464 6.66663C3.00464 7.55861 3.9454 8.18578 5.82693 9.44014L7.31768 10.434C8.21393 11.0315 8.66205 11.3302 9.16668 11.3302C9.67131 11.3302 10.1194 11.0315 11.0157 10.434Z"
                                stroke="#374151" stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                        <span
                            className="px-2 font-medium text-base leading-7 text-gray-700 transition-all duration-500 group-hover:text-indigo-600">
                            Administrador
                        </span>
                    </button>
                </div>
            </div>
        </section>

        <section className="flex justify-center items-center mt--12">
            <div className="bg-[#16191C] w-[90vw] h-[800px] rounded-xl">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-3xl font-bold m-8 ml-20">Estadisticas</h1>
                    <div className="mr-20">
                        <Excel/>
                    </div>
                    
                </div>

                <div className="hidden md:block">
                <Tabs.Root defaultValue="general" className="flex flex-col justify-center items-center">
                    <Tabs.List className="w-[80vw]">
                        <Tabs.Trigger value="general">General</Tabs.Trigger>
                        <Tabs.Trigger value="abiertos">Espacios Abiertos</Tabs.Trigger>
                        <Tabs.Trigger value="garage">Garage valley</Tabs.Trigger>
                        <Tabs.Trigger value="x-ploracion">Zona de X-ploracion</Tabs.Trigger>
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="general">
                            <Graficas data1={dataUsoEspaciosGeneral} data2={datosGenerales}/>
                        </Tabs.Content>

                        <Tabs.Content value="abiertos">
                            <Graficas data1={dataUsoEspaciosAbiertos} data2={datosAbiertos}/>
                        </Tabs.Content>

                        <Tabs.Content value="garage">
                            <Graficas data1={dataUsoEspaciosGarage} data2={datosGarage}/>
                        </Tabs.Content>

                        <Tabs.Content value="x-ploracion">
                            <Graficas data1={dataUsoEspaciosExploracion} data2={datosExploracion}/>
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
                </div>
            </div>
        </section>
                                            

    </div>
    );
  }