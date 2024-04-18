"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Box } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import HourCards from "../components/HourCards";
import axios from "axios";

interface WeekData {
  dataBase: string;
  weekdaysTittle: string;
  weekdaysDescription: string;
}

function DataBaseDates() {
  const today = new Date();
  const today_date = today.toLocaleDateString("en-CA");

  const weekDaysDB = [today_date];

  for (let i = 1; i < 7; i++) {
    const nextday = new Date();
    nextday.setDate(today.getDate() + i);
    weekDaysDB.push(nextday.toLocaleDateString("en-CA"));
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

  for (let i = 0; i < 7; i++) {
    weekDaysTittle.push(weekDaysFormat[today_week_m]);
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

  const today = new Date();
  const month = months[today.getMonth()];

  const weekDescription = [];

  for (let i = 0; i < 8; i++) {
    const nextDay = new Date();
    const dia = nextDay.getDate() + i;
    nextDay.setDate(today.getDate() + i);

    weekDescription.push(dia + " de " + month);

    if (i > 6) {
      weekDescription[8] = "Hoy";
      weekDescription[9] = "Mañana";
    }
  }
  return weekDescription;
}

export default function HourChooser(
  inicio: string,
  setInicio: any,
  date: string,
  setDate: any
) {
  const [id, setId] = useState(1);
  const [data, setData] = useState([]);
  const sp = useSearchParams();

  const dias = DataBaseDates();
  const weekdays = WeekDays();
  const description = Description();

  const datos: WeekData[] = [];
  for (let i = 0; i < 6; i++) {
    datos.push({
      dataBase: dias[i],
      weekdaysTittle: weekdays[i],
      weekdaysDescription: description[i],
    });
  }

  useEffect(() => {
    const id_temporal = sp.get("id") || "1";
    setId(parseInt(id_temporal));

    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/schedule/`, { id: id });
        const data = response.data;
        setData(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching schedule:", error);
      }
    };

    fetchData();
  }, []);

  const handleTabsChange = (value: string) => {
    const Day = new Date();
    const Año = Day.getFullYear();

    switch (value) {
      case "dia1":
        setDate(
          datos[0].weekdaysTittle +
            " " +
            datos[0].weekdaysDescription +
            " del " +
            Año
        );
        break;
      case "dia2":
        setDate(
          datos[1].weekdaysTittle +
            " " +
            datos[1].weekdaysDescription +
            " del " +
            Año
        );
        break;
      case "dia3":
        setDate(
          datos[2].weekdaysTittle +
            " " +
            datos[2].weekdaysDescription +
            " del " +
            Año
        );
        break;
      case "dia4":
        setDate(
          datos[3].weekdaysTittle +
            " " +
            datos[3].weekdaysDescription +
            " del " +
            Año
        );
        break;
      case "dia5":
        setDate(
          datos[4].weekdaysTittle +
            " " +
            datos[4].weekdaysDescription +
            " del " +
            Año
        );
        break;
      case "dia6":
        setDate(
          datos[5].weekdaysTittle +
            " " +
            datos[5].weekdaysDescription +
            " del " +
            Año
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-[40vh]">
      hola
    </div>
  );
}
