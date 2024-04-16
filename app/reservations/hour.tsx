/* eslint-disable @next/next/no-img-element */
"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Tabs, Box, Separator, Theme } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import HourCards from "../components/HourCards";
import { data } from "@/data/areas_data"; 
import axios from "axios";

function DataBaseDates() {
  const today = new Date();
  const today_date = today.toLocaleDateString('es-MX');

  const weekDaysDB = [today_date];

  for (let i = 1; i < 7; i++) {
    const nextday = new Date();
    nextday.setDate(today.getDate() + i);
    weekDaysDB.push(nextday.toLocaleDateString('es-MX'));
  }

  return weekDaysDB;
}

function WeekDays() {
  const weekDaysFormat = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado",];
  const weekDaysTittle = [];

  const today = new Date();
  const today_week = today.getDay();
  let today_week_m = today_week;

  for (let i = 0; i < 7; i++) {
    /*if (today_week_m != 0) {
      weekDaysTittle.push(weekDaysFormat[today_week_m]);
    }*/
    weekDaysTittle.push(weekDaysFormat[today_week_m]);
    if (today_week_m === 6) {
      today_week_m = 0;
    }
    today_week_m++;
  }
  return weekDaysTittle;
}

function Description() {
  const months = ["Enero", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const today = new Date();
  const month = months[today.getMonth()];

  const weekDescription = [];

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date();
    const dia = nextDay.getDate() + i;
    nextDay.setDate(today.getDate() + i);

    if (i === 0) {
      weekDescription.push("Hoy");
    } else if (i === 1) {
      weekDescription.push("Mañana");
    } else {
        weekDescription.push(dia + " de " + month);
      }

    /*
    if (i === 0 && nextDay.getDay() != 0) {
      weekDescription.push("Hoy");
    } else if (i === 1 && nextDay.getDay() != 0) {
      weekDescription.push("Mañana");
    } else {
      if (nextDay.getDay() != 0) {
        weekDescription.push(dia + " de " + month);
      }
    }*/
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

export default function HourChooser(inicio: string, setInicio: any) {
  const [id, setId] = useState(1);
  const [data, setData] = useState([]);
  const sp = useSearchParams();

  const dias = DataBaseDates();
  const weekdays = WeekDays();
  const description = Description();

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

  useEffect(() => {
    const id_temporal = sp.get("id") || "1";
    setId(parseInt(id_temporal));

    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/schedule/`, {id: id});
        const data = response.data;
        setData(data);
        
      } catch (error) {
        // Handle error
        console.error("Error fetching schedule:", error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className="h-[85vh]">
        <div className="relative w-full">
            <img
            src={bg_image}
            alt="Descripción"
            className="w-full h-[40vh] object-cover md:opacity-70 opacity-50"
            />
             <section className="absolute inset-0 flex flex-col items-center justify-center lg:items-start">
                <div className="text-center lg:pl-16 lg:text-start text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide"> {name} </div>
             </section>
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-[100vw] md:w-[80vw]"> 
            <Tabs.Root defaultValue="dia1" className="">
                <Tabs.List className="w-full flex justify-center overflow-x-auto" size="">
                <Tabs.Trigger value="dia1" className="">
                    <div className="flex flex-col items-center w-40">
                    <h1 className="font-bold">{datos[0].weekdaysTittle}</h1> {/* text-2xl */}
                    <h1 className="">{datos[0].weekdaysDescription}</h1>  {/* mb-4 */}
                    </div>
                </Tabs.Trigger>

                <Tabs.Trigger value="dia2">
                    <div className="flex flex-col items-center w-40">
                    <h1 className="font-bold">{datos[1].weekdaysTittle}</h1>
                    <h1>{datos[1].weekdaysDescription}</h1>
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
                  <HourCards day={datos[0].dataBase} setInicio={setInicio} data={data} id={id}/>
              </Tabs.Content>
              <Tabs.Content value="dia2">
                  <HourCards day={datos[1].dataBase} setInicio={setInicio} data={data} id={id}/>
              </Tabs.Content>
              <Tabs.Content value="dia3">
                  <HourCards day={datos[2].dataBase} setInicio={setInicio} data={data} id={id}/>
              </Tabs.Content>
              <Tabs.Content value="dia4">
                  <HourCards day={datos[3].dataBase} setInicio={setInicio} data={data} id={id}/>
              </Tabs.Content>
              <Tabs.Content value="dia5">
                  <HourCards day={datos[4].dataBase} setInicio={setInicio} data={data} id={id}/>
              </Tabs.Content>
              <Tabs.Content value="dia6">
                  <HourCards day={datos[5].dataBase} setInicio={setInicio} data={data} id={id}/>
              </Tabs.Content>
                
                </Box>

            </Tabs.Root>
            </div>
            </div>
    </div>
  );
}