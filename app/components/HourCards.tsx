"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { reservation_data } from "@/data/reservation_data";
import { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";

function getAvailableStartHours(spaceId: number, day: string): string[] {
  const filteredReservations = reservation_data.filter((reservation) => {
    return (
      reservation.SpaceId === spaceId &&
      reservation.Day === day &&
      !reservation.Occupied
    );
  });

  const availableStartHours = filteredReservations.map(
    (reservation) => reservation.StartHour
  );

  return availableStartHours;
}

function HourCards({
    day,
}: {
    day : string;
}) {
  const sp = useSearchParams();
  const id_temporal = sp.get("id") || "1";
  const id = parseInt(id_temporal);

  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [buttonStates, setButtonStates] = useState(Array(horasDisponibles.length).fill(false));


  useEffect(() => {
    const availableStartHours = getAvailableStartHours(id, day);
    setHorasDisponibles(availableStartHours);
    setButtonStates(Array(availableStartHours.length).fill(false));
  }, [id]);

  const handleBotonClick = (index: number) => {
    const selectedCount = buttonStates.filter(state => state).length;
  
    if (selectedCount === 2 && !buttonStates[index]) {
      return;
    }
  
    setButtonStates(prevStates => {
        const newStates = [...prevStates];
        newStates[index] = !newStates[index];
        return newStates;
    });
  };
  
  


  return (
    <div className="flex justify-center min-h-32">
        <div className="grid justify-center items-center lg:grid-cols-6 md:grid-cols-3 grid-cols-2"> 
            {horasDisponibles.map((hora, index) => (
            <button
            key={index}
            className={`w-40 h-10 flex justify-center items-center m-4 rounded-full text-white ${buttonStates[index] ? 'bg-green-600' : 'bg-[#3A3B3E]'} hover:bg-green-500 active:bg-green-600`}
            onClick={() => handleBotonClick(index)}
          >
            {hora}
          </button>

            ))}
        </div>
    </div>
    /*<div>
        {horasDisponibles.map((hora, index) => (
            <button
                key={index}
                className={`w-40 h-10 flex justify-center items-center mb-2 mt-4 rounded-full text-white ${buttonColor ? 'bg-green-600' : 'bg-[#3A3B3E]'} hover:bg-[#1D1D1F]`}
                onClick={handleBotonClick}>

                {hora}
            </button>))}
    </div>*/

  );
}
export default HourCards;
