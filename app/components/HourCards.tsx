"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Schedule {
  ScheduleId: number;
  SpaceId: number;
  Day: string;
  StartHour: string;
  EndHour: string;
}

function getAvailableStartHours(day: string, reservation_data: []): string[] {
  const filteredReservations = reservation_data.filter(
    (reservation: Schedule) => {
      return reservation.Day === day;
    }
  );

  const availableStartHours = filteredReservations.map(
    (reservation: Schedule) => reservation.StartHour
  );

  return availableStartHours;
}

function getScheduleId(day: string, reservation_data: []): number[] {
  const filteredReservations = reservation_data.filter(
    (reservation: Schedule) => {
      return reservation.Day === day;
    }
  );

  const scheduleId = filteredReservations.map(
    (reservation: Schedule) => reservation.ScheduleId
  );

  return scheduleId;
}

function HourCards({
  day,
  setInicio,
  data,
  id,
  setScheduleId,
}: {
  day: string;
  setInicio: any;
  data: any;
  id: number;
  setScheduleId: any;
  
}) {
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [buttonStates, setButtonStates] = useState(
    Array(horasDisponibles.length).fill(false)
  );

  useEffect(() => {
    const availableStartHours = getAvailableStartHours(day, data);
    setHorasDisponibles(availableStartHours);
    setButtonStates(Array(availableStartHours.length).fill(false));
  }, []);

  const handleBotonClick = (index: number, hora: string) => {
    const selectedCount = buttonStates.filter((state) => state).length;
    if (selectedCount === 1 && !buttonStates[index]) {
      return;
    }

    setButtonStates((prevStates) => {
      setInicio(hora);
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });

    const scheduleId = getScheduleId(day, data)[index]; 
    setScheduleId(scheduleId);
    //console.log("ID", scheduleId);
  };;

  return (
    <div className="flex justify-center h-[25vh] md:h-40 items-start overflow-y-auto">
      <div className="grid justify-center items-center lg:grid-cols-6 md:grid-cols-3 grid-cols-2">
        {horasDisponibles.map((hora, index) => (
          <button
            key={index}
            className={`w-40 h-10 flex justify-center items-center m-4 rounded-full text-white ${
              buttonStates[index] ? "bg-green-600" : "bg-[#3A3B3E]"
            } hover:bg-green-500 active:bg-green-600`}
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
