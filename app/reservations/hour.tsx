"use client"
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

  for (let i = -1; i < 7; i++) {
    if (today_week_m === 7) {
      today_week_m = 0;
    }
    weekDaysTittle.push(weekDaysFormat[today_week_m]);
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

function hour(
  id: number,
  inicio: string,
  setInicio: any,
  date: string,
  setDate: any,
  data: any[],
  scheduleId: number,
  setScheduleId: any,
) {
  const dias = DataBaseDates();
  const weekdays = WeekDays();
  const description = Description();
  const [prueba, setPrueba] = useState(0);

  const datos: WeekData[] = [];
  for (let i = 0; i < 6; i++) {
    datos.push({
      dataBase: dias[i],
      weekdaysTittle: weekdays[i],
      weekdaysDescription: description[i],
    });
  }


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
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="w-[100vw] md:w-[80vw]">
          <Tabs.Root
            defaultValue="dia1"
            className=""
            onValueChange={handleTabsChange}
          >
            <Tabs.List
              className="w-full flex justify-center overflow-x-auto"
              size=""
            >
              <Tabs.Trigger value="dia1" className="">
                <div className="flex flex-col items-center w-40">
                  <h1 className="font-bold">{datos[0].weekdaysTittle}</h1>{" "}
                  {/* text-2xl */}
                  <h1 className="">{description[8]}</h1> {/* mb-4 */}
                </div>
              </Tabs.Trigger>

              <Tabs.Trigger value="dia2">
                <div className="flex flex-col items-center w-40">
                  <h1 className="font-bold">{datos[1].weekdaysTittle}</h1>
                  <h1>{description[9]}</h1>
                </div>
              </Tabs.Trigger>

              <Tabs.Trigger value="dia3">
                <div className="flex flex-col items-center w-40">
                  <h1 className="font-bold">{datos[2].weekdaysTittle}</h1>
                  <h1>{datos[2].weekdaysDescription}</h1>
                </div>
              </Tabs.Trigger>

              <Tabs.Trigger value="dia4">
                <div className="flex flex-col items-center w-40">
                  <h1 className="font-bold">{datos[3].weekdaysTittle}</h1>
                  <h1>{datos[3].weekdaysDescription}</h1>
                </div>
              </Tabs.Trigger>

              <Tabs.Trigger value="dia5">
                <div className="flex flex-col items-center w-40">
                  <h1 className="font-bold">{datos[4].weekdaysTittle}</h1>
                  <h1>{datos[4].weekdaysDescription}</h1>
                </div>
              </Tabs.Trigger>

              <Tabs.Trigger value="dia6">
                <div className="flex flex-col items-center w-40">
                  <h1 className="font-bold">{datos[5].weekdaysTittle}</h1>
                  <h1>{datos[5].weekdaysDescription}</h1>
                </div>
              </Tabs.Trigger>
            </Tabs.List>

            <Box pt="4">
              <Tabs.Content value="dia1">
                <HourCards
                  day={datos[0].dataBase}
                  setInicio={setInicio}
                  data={data}
                  id={id}
                  setScheduleId={setScheduleId}
                />
              </Tabs.Content>
              <Tabs.Content value="dia2">
                <HourCards
                  day={datos[1].dataBase}
                  setInicio={setInicio}
                  data={data}
                  id={id}
                  setScheduleId={setScheduleId}
                />
              </Tabs.Content>
              <Tabs.Content value="dia3">
                <HourCards
                  day={datos[2].dataBase}
                  setInicio={setInicio}
                  data={data}
                  id={id}
                  setScheduleId={setScheduleId}
                />
              </Tabs.Content>
              <Tabs.Content value="dia4">
                <HourCards
                  day={datos[3].dataBase}
                  setInicio={setInicio}
                  data={data}
                  id={id}
                  setScheduleId={setScheduleId}
                />
              </Tabs.Content>
              <Tabs.Content value="dia5">
                <HourCards
                  day={datos[4].dataBase}
                  setInicio={setInicio}
                  data={data}
                  id={id}
                  setScheduleId={setScheduleId}
                />
              </Tabs.Content>
              <Tabs.Content value="dia6">
                <HourCards
                  day={datos[5].dataBase}
                  setInicio={setInicio}
                  data={data}
                  id={id}
                  setScheduleId={setScheduleId}
                />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}

export default hour
