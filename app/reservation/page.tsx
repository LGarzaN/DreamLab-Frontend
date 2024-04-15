"use client";
import React from "react";
import { Tabs, Box, Separator, Theme } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import HourCards from "../components/HourCards";
import { data } from "@/data/areas_data";

function DataBaseDates() {
  const today = new Date();
  const today_date = today.toISOString().split("T")[0];

  const weekDaysDB = [today_date];

  for (let i = 1; i < 7; i++) {
    const nextday = new Date();
    nextday.setDate(today.getDate() + i);

    if (nextday.getDay() != 0) {
      weekDaysDB.push(nextday.toISOString().split("T")[0]);
    }
  }

  return weekDaysDB;
}

function WeekDays() {
  const weekDaysFormat = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  const weekDaysTittle = [];

  const today = new Date();
  const today_week = today.getDay();
  let today_week_m = today_week;

  for (let i = 0; i < 6; i++) {
    if (today_week_m != 0) {
      weekDaysTittle.push(weekDaysFormat[today_week_m]);
    }
    if (today_week_m === 6) {
      today_week_m = 0;
    }
    today_week_m++;
  }

  return weekDaysTittle;
}

function Description() {
  const months = [
    "Enero",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const today = new Date();
  const month = months[today.getMonth()];

  const weekDescription = [];

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date();
    const dia = nextDay.getDate() + i;
    nextDay.setDate(today.getDate() + i);

    if (i === 0) {
      weekDescription.push("Hoy");
    } else if (i === 1 && nextDay.getDay() != 0) {
      weekDescription.push("Mañana");
    } else {
      if (nextDay.getDay() != 0) {
        weekDescription.push(dia + " de " + month);
      }
    }
  }
  return weekDescription;
}

function getName(id: number) {
    const area = data.find((area) => area.id === id);
    return area ? area.name : null;
}

function getImage(id: number) {
    const area = data.find((area) => area.id === id);
    return area ? area.image : null;
}

function Page() {
  const dias = DataBaseDates();
  const weekdays = WeekDays();
  const description = Description();

  const sp = useSearchParams();
  const id_temporal = sp.get("id") || "1";
  const id = parseInt(id_temporal);
  const bg_image = getImage(id) || "/areas/social_network.jpeg";
  const name = getName(id) || "Social Network";
  let day = 0;

  const datos = [];
  for (let i = 0; i < 6; i++) {
    datos.push({
      dataBase: dias[i],
      weekdaysTittle: weekdays[i],
      weekdaysDescription: description[i],
    });
  }
  return (
    <div>
        <div className="relative w-full">
            <img
            src={bg_image}
            alt="Descripción"
            className="w-full h-[60vh] object-cover md:opacity-70 opacity-50"
            />
             <section className="absolute inset-0 flex flex-col items-center justify-center lg:items-start">
                <div className="text-center lg:pl-16 lg:text-start text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide"> {name} </div>
             </section>
        </div>

        <div className="flex justify-center mt-20">
            {datos.map((dato, index) => (
            <div key={index} className="m-8 w-40">
                <h1 className="text-2xl font-bold text-center">{dato.weekdaysTittle}</h1>
                <p className="text-center">{dato.weekdaysDescription}</p>
                <HourCards day={dato.dataBase}/>
            </div>
        ))}
        </div>
    </div>
  );
}

export default Page;
