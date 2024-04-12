"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { data } from "@/data/areas_data";
import { reservation_data } from "@/data/reservation_data";

function getImage(name: string) {
  const area = data.find((area) => area.name === name);
  return area ? area.image : null;
}

function ReservaHora() {
  const sp = useSearchParams();
  const name = sp.get("name") || "Lego Room";
  const image_link = getImage(name) || "/areas/lego_room.jpeg";
  const now = new Date();
  const day = now.getDay();
  const date = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const dayNames = [
    "Domingo",
    "Lunes ",
    "Martes ",
    "Miercoles ",
    "Jueves ",
    "Viernes ",
    "Sabado ",
  ];
  const daysArragend = [];
  const numbersArragend = [];
  let day_i = day;

  for (let i = 0; i < 7; i++) {
    daysArragend[i] = dayNames[day_i];
    numbersArragend[i] = date + i;
    if (day_i >= 6) {
      day_i = 0;
    } else {
      day_i++;
    }
  }

  const dates = [];

  for (let i = 0; i < 7; i++) {
    if (daysArragend[i] != "Domingo") {
      dates[i] = numbersArragend[i] + " de " + monthNames[month];
    }
  }

  const horas = reservation_data.filter(item => item.atributo === "disponible");

  return (
    <div>
      <div className="relative w-full">
        <Image
          src={image_link}
          width={200}
          height={200}
          alt="Descripción"
          className="w-full h-[30vh] lg:h-[40vh] object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center lg:justify-start m-16 text-2xl lg:text-6xl font-extrabold">
          <h1>{name}</h1>
        </div>
      </div>
      <section className="w-[80vw] flex">
        {dates.map((index) => (
          <div>
             <div className="w-32 font-bold"> {index} </div>
             <div className="flex flex-col">
                {horas.map((elemento) => (
                  <div>{elemento}</div>
                ))}
             </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ReservaHora;
