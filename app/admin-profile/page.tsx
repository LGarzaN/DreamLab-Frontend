"use client"
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Tabs, Box, Dialog, Flex, Button, TextFieldInput, TextArea, AlertDialog } from "@radix-ui/themes";
import axios from "axios";
import Graficas from "./general";
import Excel from "./components/Excel";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Switch from '@radix-ui/react-switch';
import toast from "react-hot-toast";


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
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
              const res = await axios.get("/api/news", {
                headers: {
                  'source': 'admin'
                }
              });
              console.log(res.data);
              setNews(res.data);
            } catch (e) {
              console.log(e);
            }
          }
        fetchNews();

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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        //form validation
        if (!e.target.title.value || !e.target.content.value || !e.target.url.value) {
            toast.error('Todos los campos son requeridos', {style: {backgroundColor: "#121417", color: "white"}});
            return;
        }
        const body = {
            title: e.target.title.value,
            content: e.target.content.value,
            image: e.target.url.value,
            date: new Date(),
            shown: true,
            deleted: false
        }

        const prom = new Promise<void>((resolve, reject) => {
            axios.post('/api/news', body, {
                headers: {
                    'source': 'admin'
                }
            })
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject();
            });
        });

        toast.promise(prom, {
            loading: 'Creando...',
            success: 'Creado',
            error: 'Error al guardar',
        }, {style: {backgroundColor: "#121417", color: "white"}});

        const timeout = new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
        await timeout;
        window.location.reload();
    }

    return (
    <div>
        <Navbar />
        <section className="relative pt-40 pb-16">
            <img src="/techimg.png" alt="cover-image" className="w-full absolute top-0 left-0 z-0 h-60 md:h-[40vh] object-cover"/>
            <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-row">
                <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
                    <img src="/profilepic.jpeg" alt="user-image" className=" md:w-[200px] md:h-[200px] rounded-full h-32 w-32"/>
                </div>
                <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5 pt-36 ml-6 md:w-10/12">
                    <div className="block">
                        <h3 className="font-bold text-4xl text-white mb-1">Luis Garza</h3>
                        <p className="font-normal text-base leading-7 text-gray-500">luisgarzan@tec.mx</p>
                    </div>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <button
                                className="rounded-full py-3.5 px-5 bg-gray-100 flex items-center group transition-all duration-500 hover:bg-indigo-100 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path className="stroke-gray-700 transition-all duration-500 group-hover:stroke-indigo-600"
                                        d="M14.1667 11.6666V13.3333C14.1667 14.9046 14.1667 15.6903 13.6785 16.1785C13.1904 16.6666 12.4047 16.6666 10.8333 16.6666H7.50001C5.92866 16.6666 5.14299 16.6666 4.65483 16.1785C4.16668 15.6903 4.16668 14.9047 4.16668 13.3333V11.6666M16.6667 9.16663V13.3333M11.0157 10.434L12.5064 9.44014C14.388 8.18578 15.3287 7.55861 15.3287 6.66663C15.3287 5.77466 14.388 5.14749 12.5064 3.89313L11.0157 2.8993C10.1194 2.3018 9.67131 2.00305 9.16668 2.00305C8.66205 2.00305 8.21393 2.3018 7.31768 2.8993L5.82693 3.89313C3.9454 5.14749 3.00464 5.77466 3.00464 6.66663C3.00464 7.55861 3.9454 8.18578 5.82693 9.44014L7.31768 10.434C8.21393 11.0315 8.66205 11.3302 9.16668 11.3302C9.67131 11.3302 10.1194 11.0315 11.0157 10.434Z"
                                        stroke="#374151" stroke-width="1.6" stroke-linecap="round" />
                                </svg>
                                <span
                                    className="px-2 font-medium text-base leading-7 text-gray-700 transition-all duration-500 group-hover:text-indigo-600">
                                    Administrar Videowall
                                </span>
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Content style={{maxWidth: 850}}>
                            <div className="flex justify-between mx-7 mt-3">
                                <p className="text-3xl text-center font-semibold">Noticias</p>
                                <Dialog.Root>
                                    <Dialog.Trigger>
                                        <Button color="green" variant="surface" size={"3"}>
                                            Agregar
                                        </Button>
                                    </Dialog.Trigger>
                                    <Dialog.Content>
                                        <div className="w-full px-10">
                                            <p className="text-2xl mb-4 font-semibold">Agregar Noticia</p>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-5">
                                                    <label className="text-gray-300 mb-1">Titulo</label>
                                                    <TextFieldInput
                                                        type="text"
                                                        placeholder="Titulo"
                                                        className="w-full"
                                                        name="title"
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label className="text-gray-300 mb-1">Contenido</label>
                                                    <TextArea
                                                        placeholder="Contenido"
                                                        className="w-full"
                                                        name="content"
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label className="text-gray-300 mb-1">URL de Imagen</label>
                                                    <TextFieldInput
                                                        type="text"
                                                        placeholder="Titulo"
                                                        className="w-full"
                                                        name="url"
                                                    />
                                                </div>
                                                <div className="flex gap-x-4 justify-end">
                                                    <Dialog.Close>
                                                        <Button color="gray" variant="surface">
                                                            Cancelar
                                                        </Button>
                                                    </Dialog.Close>
                                                    <Button color="green" variant="surface" type="submit">
                                                        Agregar
                                                    </Button>
                                                </div>
                                            </form>
                                            
                                        </div>
                                    </Dialog.Content>
                                </Dialog.Root>
                                
                            </div>
                            
                            <ScrollArea.Root className="mx-2 my-4">
                                <ScrollArea.Viewport className="w-full h-[60vh]">
                                    <div style={{ padding: '15px 20px' }} className="gap-4 flex flex-col">
                                        {news && news.map((news: News, index) => <NewsCard news={news} key={index}/>)}                                       
                                    </div>
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                                <ScrollArea.Thumb className="w-4 border-gray-700 border-2 rounded" />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Corner className="ScrollAreaCorner" />
                            </ScrollArea.Root>
                        </Dialog.Content>
                    </Dialog.Root>
                </div>
            </div>
        </section>

        <section className="flex justify-center items-center">
            <div className="bg-[#16191C] w-[90vw] h-auto rounded-xl py-8 mb-10 pb-16">
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

interface News {
    _id: string,
    title: string,
    content: string,
    date: Date,
    shown: boolean,
    deleted: boolean,
    image: string,
}

const NewsCard = ({ news }: { news: News }) => {
    const handleVisibleChange = (checked: boolean) => {
        console.log(news._id)
        const prom = new Promise<void>((resolve, reject) => {
            axios.put(`/api/news/`, { 
                shown: checked,
                _id: news._id
            }, {
                headers: {
                    'source': 'admin'
                }
            })
            .then(() => {
                resolve();
            })
            .catch((e) => {
                reject();
            });
        });
        toast.promise(prom, {
            loading: 'Guardando...',
            success: 'Guardado',
            error: 'Error al guardar',
        }, {style: {backgroundColor: "#121417", color: "white"}});

    }

    const handleDelete = () => {
        const body = {
            _id: news._id
        }
        const prom = new Promise<void>((resolve, reject) => {
            axios.delete(`/api/news/`, {
                data:{
                    _id: news._id
                },
                headers: {
                    'source': 'admin'
                }
            })
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject();
            });
        });

        toast.promise(prom, {
            loading: 'Eliminando...',
            success: 'Eliminado',
            error: 'Error al eliminar',
        }, {style: {backgroundColor: "#121417", color: "white"}});

        const timeout = new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
        timeout.then(() => {
            window.location.reload();
        });
    }
    return (
        <div className="bg-[#23282d] border-gray-300  border-opacity-20 h-[25vh] flex flex-row rounded-lg p-3">
            <img src={news.image || "/videowall/news1.png"} className="w-[40%] rounded" alt="..." />
            <div className=" w-[40%] h-full ml-2 p-2">
                <p className="text-xl font-semibold">{news.title}</p>
                <p className="text-sm font-normal text-gray-300 mb-4">{formatDate(news.date)}</p>
                <p className="text-sm font-normal">{news.content}</p>
            </div>
            <div className=" w-[17%] h-full ml-2 flex flex-col items-center justify-between py-2">
                <div className="flex flex-row items-center mb-4">
                    <label htmlFor="news" className="text-white mr-3">Visible</label>
                    <Switch.Root
                        className="w-[42px] h-[25px] bg-blackA6 bg-gray-600 rounded-full relative data-[state=checked]:bg-violet-500 outline-gray-400 cursor-default"
                        id="airplane-mode"
                        defaultChecked={news.shown}
                        onCheckedChange={handleVisibleChange}
                    >
                        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                </div>
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Button color="red" variant="surface">Eliminar</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content style={{maxWidth: 500}}>
                        <div className="flex flex-col mx-3">
                            <p className="text-lg font-semibold mb-3">¿Está seguro que desea eliminar esta noticia?</p>
                            <p className="text-sm font-normal text-gray-300">Esta acción no se puede deshacer</p>
                            <div className="flex gap-4 mt-4 justify-end">
                                <AlertDialog.Cancel>
                                    <Button color="gray" variant="surface">Cancelar</Button>
                                </AlertDialog.Cancel>
                                <Button color="red" variant="surface" onClick={handleDelete}>Eliminar</Button>
                            </div>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Root>
            </div>
        </div>
    )
}

const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}