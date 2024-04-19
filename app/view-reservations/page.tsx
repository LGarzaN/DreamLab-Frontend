"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

interface Reservation {
    Day: string,
    StartHour: string,
    EndHour: string,
    SpaceName: string,
    SpaceId: number,
    RequirementsId: string,
    RequirementsQuantity: string,
    GroupCode: string
}

export default function Page() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/reservations')
        .then((response) => {
            setReservations(response.data)
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
            <img src="/viewReservations.png" alt="View Reservations" className="w-full h-[30vh] lg:h-[30vh] object-cover brightness-75" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <h1 className="text-2xl lg:text-5xl text-white z-10 pl-20 mt-10">Mis Reservaciones</h1>
            </div>
        </div>
        <div className="h-[70vh] flex">
            {!loading && reservations.length > 0 ? reservations.map((reservation: Reservation, index) => {
                return (
                    ReservationCard(index, reservation)
                )
            }):<div className="flex w-full h-full justify-center items-center">{reservations.length == 0 && loading ? <ClipLoader size={60} color="white"/> : <p className="text-2xl font-bold">No Reservations</p>} </div>}
        </div>
    </div>)
}

function ReservationCard(index: number, reservation: Reservation) {
    return <AlertDialog.Root key={index}>
        <AlertDialog.Trigger>
            <div className="w-5/12 h-[40vh] flex flex-row p-10">
                <div className="w-1/2">
                    <img src="/areas/social_network.jpeg" className="rounded-lg h-full w-full" />
                </div>
                <div className="w-1/2 p-6">
                    <div className="">
                        <p className="text-xl font-bold">{reservation.SpaceName}</p>
                        <p className="text-lg text-neutral-400">Espacios Abiertos</p>
                    </div>
                    <div className="mt-10 gap-2">
                        <p className="font-bold">{reservation.Day}</p>
                        <p>{`${reservation.StartHour} - ${reservation.EndHour}`}</p>
                    </div>
                </div>
            </div>
        </AlertDialog.Trigger>
        <AlertDialog.Content size={"4"}>
            <AlertDialog.Title>{`Reservación en ${reservation.SpaceName} Room`}</AlertDialog.Title>
            <AlertDialog.Description size="2">
                <div className="text-lg">
                    <p>{`Dia: ${reservation.Day}`}</p>
                    <p>{`Horario: ${reservation.StartHour} - ${reservation.EndHour}`}</p>
                    <p>{`Grupo: ${reservation.GroupCode}`}</p>
                </div>
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                        Cerrar
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button variant="solid" color="red">
                        Cancelar Reservación
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>;
}