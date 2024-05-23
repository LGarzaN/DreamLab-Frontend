"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AlertDialog, Button, Flex, Tooltip } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { data } from "@/data/areas_data";

interface Reservation {
    Day: string,
    StartHour: string,
    EndHour: string,
    SpaceName: string,
    SpaceId: number,
    RequirementsId: string,
    RequirementsQuantity: string,
    GroupCode: string
    PendingReservationId: number
}

export default function Page() {
    const [reservations, setReservations] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/reservations')
        .then((response) => {
            setReservations(response.data)
            // setPendingReservations(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
        axios.get('/api/reservations/pending')
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
    return (
    <div className="h-screen">
        <Navbar />
        <div className="relative w-full">
            <img src="/viewReservations.png" alt="View Reservations" className="w-full h-[20vh] md:h-[30vh] lg:h-[30vh] object-cover brightness-75" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <h1 className="text-4xl lg:text-5xl text-white z-10 pl-10 md:pl-20 mt-10">Mis Reservaciones</h1>
            </div>
        </div>
        <div className="md:h-[70vh] grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 px-5 py-8 gap-y-14">
    {!loading && reservations.length > 0 ? (
        reservations.map((reservation: Reservation, index) => {
            return ReservationCard(index, reservation);
        })
    ) : null}
    {!loading && pendingReservations.length > 0 ? (
        pendingReservations.map((reservation: Reservation, index) => {
            return ReservationCard(index, reservation, true);
        })
    ) : null}
    {!loading && reservations.length === 0 && pendingReservations.length === 0 && (
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
        const res = await axios.delete(`/api/reservations/`, {
            headers: {
                'reservation-type': pending ? "pending" : "confirmed"
            },
            data: {
                group_code: reservation.GroupCode,
                pendingId: reservation.PendingReservationId
            }
        })

        if (res.status === 200) {
            toast.success("Reservación Cancelada con exito!", {style: {backgroundColor: "#121417", color: "white"}, duration: 1000})
            await new Promise((resolve) => setTimeout(resolve, 1200));
            window.location.reload()
        } else {
            toast.error("Hubo un error al cancelar la reservación")
        }

    }
    return <AlertDialog.Root key={index}>
        <AlertDialog.Trigger>
            <div className="w-full md:w-[33vw] h-[25vh] flex flex-row cursor-pointer group">
                <div className="w-[60%] justify-center items-center flex relative group-hover:opacity-85 transition-all">
                    <div className={`z-20 ${pending ? "bg-gray-500" : "bg-green-600"} gap-x-1 w-full md:w-[45%] h-[20%] top-0 rounded-t-lg md:rounded-none md:rounded-r md:top-4 left-0 absolute justify-center items-center flex md:shadow-[2px_5px_13px_-8px_#cbd5e0]`}>
                        <div>
                            {pending ? 
                            <img src="/pending.svg" className="w-6 h-6"/>
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>}
                        </div>
                        {pending ? "Pendiente": "Confirmada"}
                    </div>
                    <img src={getImage(reservation.SpaceId)} className="rounded-lg z-0 h-full w-full" alt="Space Image"/>
                </div>
                <div className="w-[40%] p-6">
                    <div className="">
                        <p className="text-xl font-bold">{reservation.SpaceName || getSpaceName(reservation.SpaceId)}</p>
                        <p className="text-lg text-neutral-400">{getArea(reservation.SpaceId)}</p>
                    </div>
                    <div className="mt-10 gap-2">
                        <p className="font-bold">{formatSpanishDate(reservation.Day)}</p>
                        <p className="text-sm md:text-md">{`${reservation.StartHour} - ${reservation.EndHour}`}</p>
                    </div>
                </div>
            </div>
        </AlertDialog.Trigger>
        <AlertDialog.Content size={"3"} className="p-4">
    <AlertDialog.Title className="text-center mb-4">
        <p className="text-3xl">{pending ? "En espera de confirmación" : "¡Te esperamos!"}</p>
    </AlertDialog.Title>
    <AlertDialog.Description className="mb-4">
        <p className="font-light text-xl px-5">{pending ? "Se te notificará por correo cuando cambie el estado de tu reserva." : "Tu reservacion ha sido confirmada."}</p>
    </AlertDialog.Description>
    <AlertDialog.Description size="3" className="mb-4">
        {pending ?
        <p className="text-gray-400 px-5">
            Para más información sobre el proceso de asignación de espacios, visita nuestra página de 
            <a href="/faq" className="text-blue-500"> Información</a>.
        </p>: <p className="text-gray-400 px-5">
            Recuerda que cuentas con una tolerancia de 5 minutos para llegar a tu reservación.
            
        </p>
        }
    </AlertDialog.Description>

    <Flex gap="3" mt="4" justify="center">
        <AlertDialog.Cancel>
            <Button variant="soft" color="gray">Cerrar</Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={handleClick}>
                Cancelar {pending ? "Solicitud" : "Reserva"}
            </Button>
        </AlertDialog.Action>
    </Flex>
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