"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Schedule {
    SpaceId: number,
    Day: string,
    StartHour: string,
    EndHour: string,
    Occupied: boolean,
}

function getAvailableStartHours(spaceId: number, day: string, reservation_data: []): string[] {
  const filteredReservations = reservation_data.filter((reservation: Schedule) => {
    return (
      reservation.SpaceId === spaceId &&
      reservation.Day === day &&
      !reservation.Occupied
    );
  });

  const availableStartHours = filteredReservations.map(
    (reservation: Schedule) => reservation.StartHour
  );

  return availableStartHours;
}

function HourCards({
    day,
    setInicio
}: {
    day : string;
    setInicio: any

}) {
  const sp = useSearchParams();
  const id_temporal = sp.get("id") || "1";
  const id = parseInt(id_temporal);

  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [buttonStates, setButtonStates] = useState(Array(horasDisponibles.length).fill(false));


  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/schedule");
        const data = response.data;
        console.log(data);
        
        const availableStartHours = getAvailableStartHours(id, day, data);
        setHorasDisponibles(availableStartHours);
        setButtonStates(Array(availableStartHours.length).fill(false));
      } catch (error) {
        // Handle error
        console.error("Error fetching schedule:", error);
      }
    };
  
    fetchData();
  }, [id]);
  

  const handleBotonClick = (index: number, hora: string) => {
    const selectedCount = buttonStates.filter(state => state).length;
    if (selectedCount === 1 && !buttonStates[index]) {
      return;
    }
  
    setButtonStates(prevStates => {
        setInicio(hora);
        const newStates = [...prevStates];
        newStates[index] = !newStates[index];
        return newStates;
    });
  };
  
  


  return (
    <div className="flex justify-center h-[25vh] md:h-40 items-start overflow-y-auto">
        <div className="grid justify-center items-center lg:grid-cols-6 md:grid-cols-3 grid-cols-2"> 
            {horasDisponibles.map((hora, index) => (
            <button
            key={index}
            className={`w-40 h-10 flex justify-center items-center m-4 rounded-full text-white ${buttonStates[index] ? 'bg-green-600' : 'bg-[#3A3B3E]'} hover:bg-green-500 active:bg-green-600`}
            onClick={() => handleBotonClick(index, hora)}
          >
            {hora}
          </button>

            ))}
        </div>
    </div>

  );
}
export default HourCards;
