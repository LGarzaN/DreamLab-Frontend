"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AlertDialog, Button, Flex, Tooltip } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { data } from "@/data/areas_data";
import { Select } from "@radix-ui/themes";

interface ReservationData {
    group_code: string;
    reservation_id: number;
    user_id?: number;
}


interface Reservation {
    Day: string,
    StartHour: string,
    EndHour: string,
    SpaceName: string,
    SpaceId: number,
    GroupCode: string,
    PendingReservationId: number,
    Name: string,
    Matricula: string,
    UserId: number,
    Fecha: string
}

function getNextSevenDays() {
  const today = new Date();
  const nextSevenDays = [];

  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = date.getDate();
    const month = meses[date.getMonth()];
    const formattedDate = `${day} de ${month}`;
    nextSevenDays.push(formattedDate);
  }

  return nextSevenDays;
}

export default function Page() {
    const [reservations, setReservations] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchArea, setSearchArea] = useState("Espacios");
    const [searchHour, setSearchHour] = useState("Hora");
    const [searchDay, setSearchDay] = useState("Fecha");

    const days = getNextSevenDays();

    useEffect(() => {
        axios.get('/api/adminreservations')
        .then((response) => {
            setReservations(response.data)
            // setPendingReservations(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
        axios.get('/api/adminreservations/pending')
        .then((response) => {
            setPendingReservations(response.data)
            // setPendingReservations(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };
    
      const handleAreaChange = (value: string) => {
        setSearchArea(value);
      };
    
      const handleHourChange = (value: string) => {
        setSearchHour(value);
      };
    
      const handleDateChange = (value: string) => {
        setSearchDay(value);
      };

    const dataToShowReservations = reservations.filter((item: Reservation) => {
        const nameMatch = item.Name.toLowerCase().includes(searchTerm.toLowerCase());
        const areaMatch = searchArea.trim() === "Espacios" || item.SpaceName.toLowerCase() === searchArea.toLowerCase();
        const hourMatch = searchHour.trim() === "Hora" || item.StartHour.toLowerCase() === searchHour.toLowerCase();
        const dateMatch = searchDay.trim() === "Fecha" || formatSpanishDate(item.Day).toLowerCase() === searchDay.toLowerCase();
        if (searchTerm.trim() === "") {
            return areaMatch && hourMatch && dateMatch;
        } else {
            return nameMatch && areaMatch && hourMatch && dateMatch;
        }
        });

    const dataToShowPending = pendingReservations.filter((item: Reservation) => {
        const nameMatch = item.Name.toLowerCase().includes(searchTerm.toLowerCase());
        const areaMatch = searchArea.trim() === "Espacios" || item.SpaceName.toLowerCase() === searchArea.toLowerCase();
        const hourMatch = searchHour.trim() === "Hora" || item.StartHour.toLowerCase() === searchHour.toLowerCase();
        const dateMatch = searchDay.trim() === "Fecha" || formatSpanishDate(item.Day).toLowerCase() === searchDay.toLowerCase();

        if (searchTerm.trim() === "") {
            return areaMatch && hourMatch && dateMatch;
        } else {
            return nameMatch && areaMatch && hourMatch && dateMatch;
        }
        });

      
    return (
    <div className="h-screen">
        <Navbar />
        <div className="relative w-full">
            <img src="/viewReservations.png" alt="View Reservations" className="w-full h-[20vh] md:h-[30vh] lg:h-[30vh] object-cover brightness-75" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <h1 className="text-4xl lg:text-5xl text-white z-10 pl-10 md:pl-20 mt-10">Mis Reservaciones</h1>
            </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-8 ">
        <div className="w-[85vw] flex flex-row items-center mr-8">
          <div className="w-full flex  justify-center  space-x-4">
            <div className="NOMBRE ">
              <input
                id="1"
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={handleSearch}
                className="rounded-lg h-10 md:w-[25vw] w-[80vw] p-2 md:p-4 border-[0.2px] border-[#45444A] bg-[#0D0D0E]"
              />
            </div>

            <div className="Fecha flex items-center justify-start ">
              <div className="hidden sm:block">
                <Select.Root
                  defaultValue="Fecha"
                  onValueChange={handleDateChange}
                  size="3"
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="Fecha">Fecha</Select.Item>
                      <Select.Item value={days[0]}>{days[0]}</Select.Item>
                      <Select.Item value={days[1]}>{days[1]}</Select.Item>
                      <Select.Item value={days[2]}>{days[2]}</Select.Item>
                      <Select.Item value={days[3]}>{days[3]}</Select.Item>
                      <Select.Item value={days[4]}>{days[4]}</Select.Item>
                      <Select.Item value={days[5]}>{days[5]}</Select.Item>
                      <Select.Item value={days[6]}>{days[6]}</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
            <div className="Hora flex items-center justify-center ">
              <div className="hidden sm:block">
                <Select.Root
                  defaultValue="Hora"
                  onValueChange={handleHourChange}
                  size="3"
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="Hora">Hora</Select.Item>
                      <Select.Item value="9:00">9:00 am</Select.Item>
                      <Select.Item value="10:00">10:00 am</Select.Item>
                      <Select.Item value="11:00">11:00 am</Select.Item>
                      <Select.Item value="12:00">12:00 pm</Select.Item>
                      <Select.Item value="13:00">1:00 pm</Select.Item>
                      <Select.Item value="14:00">2:00 pm</Select.Item>
                      <Select.Item value="15:00">3:00 pm</Select.Item>
                      <Select.Item value="16:00">4:00 pm</Select.Item>
                      <Select.Item value="17:00">5:00 pm</Select.Item>
                      <Select.Item value="18:00">6:00 pm</Select.Item>
                      <Select.Item value="19:00">7:00 pm</Select.Item>
                      <Select.Item value="20:00">8:00 pm</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
            <div className="Area flex items-center justify-start ">
              <div className="hidden sm:block">
                <Select.Root
                  defaultValue="Espacios"
                  onValueChange={handleAreaChange}
                  size="3"
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="Espacios">Espacios</Select.Item>
                      <Select.Item value="Social Networking">
                        Social Networking
                      </Select.Item>
                      <Select.Item value="Lego Room">Lego Room</Select.Item>
                      <Select.Item value="Electric Garage">
                        Electric Garage
                      </Select.Item>
                      <Select.Item value="Dimension Forge">
                        Dimension Forge
                      </Select.Item>
                      <Select.Item value="New Horizons">
                        New Horizons
                      </Select.Item>
                      <Select.Item value="Deep Net">Deep Net</Select.Item>
                      <Select.Item value="Graveyard">Graveyard</Select.Item>
                      <Select.Item value="PCB Factory">PCB Factory</Select.Item>
                      <Select.Item value="The Matrix">The Matrix</Select.Item>
                      <Select.Item value="Hack battlefield">
                        Hack-Battlefield
                      </Select.Item>
                      <Select.Item value="Testing land">
                        Testing-Land
                      </Select.Item>
                      <Select.Item value="Web headquarter">
                        Web Headquarter
                      </Select.Item>
                      <Select.Item value="Biometrics flexible hall">
                        Biometrics Flexible
                      </Select.Item>
                      <Select.Item value="Beyon digits">
                        Beyon Digits
                      </Select.Item>
                      <Select.Item value="Open innovation lab">
                        Open Innovation Lab
                      </Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="md:h-[70vh] grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 px-5 py-8 gap-y-14">
            {!loading && dataToShowReservations.length > 0 ? (
                dataToShowReservations.map((reservation: Reservation, index) => {
                    return ReservationCard(index, reservation);
                })
            ) : null}
            {!loading && dataToShowPending.length > 0 ? (
                dataToShowPending.map((reservation: Reservation, index) => {
                    return ReservationCard(index, reservation, true);
                })
            ) : null}
            {!loading && dataToShowReservations.length === 0 && dataToShowPending.length === 0 && (
                <div className="flex w-[97vw] h-[63vh] justify-center items-center">
                    <p className="text-2xl font-bold">No Reservations</p>
                </div>
            )}
            {loading && (
                <div className="flex w-[97vw] h-[63vh] justify-center items-center">
                    <ClipLoader size={60} color="white" />
                </div>
            )}
        </div>

    </div>)
}

function ReservationCard(index: number, reservation: Reservation, pending: boolean = false) {
    function getImage(id: number) {
        const area = data.find((area) => area.id === id);
        return area ? area.image : "/areas/social_network.jpeg";
    }

    function getArea(id: number) {
        const area = data.find((area) => area.id === id);
        return area ? area.area : "Espacios Abiertos";
    }

    function getSpaceName(id: number) {
        const area = data.find((area) => area.id === id);
        return area ? area.name : "Espacio";
    }

    const handleClick = async () => {
        const prom = new Promise<void>(async (resolve, reject) => {
            const data: ReservationData = {
                group_code: reservation.GroupCode,
                reservation_id: reservation.PendingReservationId
            }
    
            data.user_id = reservation.UserId;
    
            try {
                const res = await axios.delete(`/api/reservations/`, {
                    headers: {
                        'reservation-type': pending ? "pending" : "confirmed"
                    },
                    data: data
                })
    
                if (res.status === 200) {
                    resolve();
                } else {
                    reject();
                }
            } catch (error) {
                reject();
            }
        });
    
        await toast.promise(prom, {
            loading: 'Cancelando...',
            success: pending ? "Solicitud cancelada" : "Reservación cancelada",
            error: 'Error al cancelar la reservación'
        }, { style: { backgroundColor: "#121417", color: "white" } });
    
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.reload();
    }
    
    
    return <AlertDialog.Root key={index}>
        <AlertDialog.Trigger>
            <div className="w-full flex items-center justify-center">
            <div className="w-[90vw] md:w-[33vw] flex flex-row cursor-pointer group bg-opacity-70 p-4 h-[30vh] rounded-xl">
                <div className="w-[60%] justify-center items-center flex relative group-hover:opacity-85 transition-all object-fit">
                    <div className={`z-20 ${pending ? "bg-gray-500" : "bg-green-600"} gap-x-1 w-full md:w-[45%] h-[20%] top-0 rounded-t-lg md:rounded-none md:rounded-r md:top-4 left-0 absolute justify-center items-center flex md:shadow-[2px_5px_13px_-8px_#cbd5e0]`}>
                        <div>
                            {pending ? 
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V12L13.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>}
                        </div>
                        {pending ? "Pendiente": "Confirmada"}
                    </div>
                    <img src={getImage(reservation.SpaceId)} className="rounded-lg z-0 h-[25vh] w-full" alt="Space Image"/>
                </div>
                <div className="w-[40%] px-6">
                    <div className="">
                        <p className="text-xl font-semibold">{reservation.SpaceName || getSpaceName(reservation.SpaceId)}</p>
                        <p className="text-neutral-400">{getArea(reservation.SpaceId)}</p>
                    </div>
                    <div className="mt-4">
                        <p className="font-semibold">{reservation.Name}</p>
                        <p className="text-neutral-400">{reservation.Matricula}</p>
                    </div>
                    <div className="mt-4 gap-2">
                        <p className="font-semibold">{formatSpanishDate(reservation.Day)}</p>
                        <p className="text-sm md:text-md">{`${reservation.StartHour} - ${reservation.EndHour}`}</p>
                    </div>
                </div>
            </div>
            </div>
        </AlertDialog.Trigger>
        <AlertDialog.Content size={"3"}>
            <div className="w-full h-full py-3 px-3">
                    <p className="text-xl font-semibold mb-3">{pending ? "En espera de confirmación" : "¡Te esperamos!"}</p>
                    <p className="text-[17px] text-gray-300">{pending ? "Se te notificará por correo cuando cambie el estado de tu reserva." : "Ya estas listo para tu experiencia en el DREAM Lab. Aqui estan los detalles de tu reservacion"}</p>
                    <div className="flex justify-center flex-col my-6 gap-y-4 text-gray-300">
                        <div className="flex flex-row justify-between">
                            <p className="">Grupo:</p>
                            <p className="text-white">{reservation && reservation.GroupCode ? reservation.GroupCode.toUpperCase() : 'No disponible'}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="">Horario:</p>
                            <p className="text-white">{convertTo12HourFormat(reservation.StartHour)}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="">Duracion:</p>
                            <p className="text-white">1 hora</p>
                        </div>
                        <div>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                    {pending ?
                    <p className="text-gray-400 mb-8">
                        Para más información sobre el proceso de asignación de espacios, visita nuestra página de 
                        <a href="/faq" className="text-blue-500"> Información</a>.
                    </p>: <p className="text-gray-400 mb-8">
                        Recuerda que cuentas con una tolerancia de 5 minutos para llegar a tu reservación.
                        
                    </p>
                    }
                <Flex gap="3" mt="4" justify="start">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">Cerrar</Button>
                    </AlertDialog.Cancel>
                        <Button variant="surface" color="red" onClick={handleClick}>
                            Cancelar {pending ? "Solicitud" : "Reserva"}
                        </Button>
                </Flex>
            </div>
        </AlertDialog.Content>
    </AlertDialog.Root>;
}

const formatSpanishDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const formattedDate = new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
    }).format(date);
    return formattedDate;
  };

  function convertTo12HourFormat(time24: string) {
    // Split the input time into hours and minutes
    let [hours, minutes] = time24.split(':').map(Number);
  
    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12;
  
    // Pad minutes with leading zero if necessary
    const minutes_string = minutes.toString().padStart(2, '0');
  
    // Return the formatted time
    return `${hours}:${minutes_string} ${period}`;
  }