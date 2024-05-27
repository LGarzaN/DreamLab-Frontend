"use client";
import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { admin_pruebas } from "@/data/admin_pruebas";
import { Select } from "@radix-ui/themes";

function getNextSevenDays() {
  const today = new Date();
  const nextSevenDays = [];

  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = date.getDate();
    const month = meses[date.getMonth()];
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    nextSevenDays.push(formattedDate);
  }

  return nextSevenDays;
}

function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchArea, setSearchArea] = useState("Espacios");
  const [searchHour, setSearchHour] = useState("Hora");
  const [searchDay, setSearchDay] = useState("Fecha");
  const days = getNextSevenDays();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAreaChange = (value: string) => {
    setSearchArea(value);
  };

  const handleHourChange = (value: string) => {
    setSearchHour(value);
  };

  const handleDateChange = (value: string) => {
    setSearchDay(value);
  };

  const dataToShow = admin_pruebas.filter((item) => {
    const nameMatch = item.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const areaMatch =
      searchArea.trim() === "Espacios" ||
      item.espacio.toLowerCase() === searchArea.toLowerCase();

    const hourMatch =
      searchHour.trim() === "Hora" ||
      item.hora_inicio.toLowerCase() === searchHour.toLowerCase();

    const dateMatch =
      searchDay.trim() === "Fecha" ||
      item.fecha.toLowerCase() === searchDay.toLowerCase();

    if (searchTerm.trim() === "") {
      return areaMatch && hourMatch && dateMatch;
    } else {
      return nameMatch && areaMatch && hourMatch && dateMatch;
    }
  });

  return (
    <div className="h-screen">
      <Navbar />
      <div className="relative w-full">
        <img
          src="/viewReservations.png"
          alt="View Reservations"
          className="w-full h-[30vh] lg:h-[30vh] object-cover brightness-75"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <h1 className="text-4xl lg:text-5xl text-white z-10 pl-20 mt-10">
            Reservaciones
          </h1>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-8 ">
        <div className="w-[85vw] flex flex-row items-center mr-8">
          <div className="w-full flex  justify-around">
            <div className="NOMBRE w-[28vw] ">
              <input
                id="1"
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={handleSearch}
                className="rounded-lg h-10 md:w-[25vw] w-[80vw] p-2 md:p-4 border-[0.2px] border-[#45444A] bg-[#0D0D0E]"
              />
            </div>

            <div className="Fecha flex items-center justify-start w-[15vw] ">
              <div className="hidden sm:block">
                <Select.Root
                  defaultValue="Fecha"
                  onValueChange={handleDateChange}
                  size="3"
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="Fecha">Fecha</Select.Item>
                      <Select.Item value={days[0]}>{days[0]}</Select.Item>
                      <Select.Item value={days[1]}>{days[1]}</Select.Item>
                      <Select.Item value={days[2]}>{days[2]}</Select.Item>
                      <Select.Item value={days[3]}>{days[3]}</Select.Item>
                      <Select.Item value={days[4]}>{days[4]}</Select.Item>
                      <Select.Item value={days[5]}>{days[5]}</Select.Item>
                      <Select.Item value={days[6]}>{days[6]}</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
            <div className="Hora flex items-center justify-center w-[18vw] ">
              <div className="hidden sm:block mr-2">
                <Select.Root
                  defaultValue="Hora"
                  onValueChange={handleHourChange}
                  size="3"
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="Hora">Hora</Select.Item>
                      <Select.Item value="9:00 am">9:00 am</Select.Item>
                      <Select.Item value="10:00 am">10:00 am</Select.Item>
                      <Select.Item value="11:00 am">11:00 am</Select.Item>
                      <Select.Item value="12:00 pm">12:00 pm</Select.Item>
                      <Select.Item value="1:00 pm">1:00 pm</Select.Item>
                      <Select.Item value="2:00 pm">2:00 pm</Select.Item>
                      <Select.Item value="3:00 pm">3:00 pm</Select.Item>
                      <Select.Item value="4:00 pm">4:00 pm</Select.Item>
                      <Select.Item value="5:00 pm">5:00 pm</Select.Item>
                      <Select.Item value="6:00 pm">6:00 pm</Select.Item>
                      <Select.Item value="7:00 pm">7:00 pm</Select.Item>
                      <Select.Item value="8:00 pm">8:00 pm</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
            <div className="Area flex items-center justify-start w-[17vw] ">
              <div className="hidden sm:block">
                <Select.Root
                  defaultValue="Espacios"
                  onValueChange={handleAreaChange}
                  size="3"
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="Espacios">Espacios</Select.Item>
                      <Select.Item value="Social Networking">
                        Social Networking
                      </Select.Item>
                      <Select.Item value="Lego Room">Lego Room</Select.Item>
                      <Select.Item value="Electric Garage">
                        Electric Garage
                      </Select.Item>
                      <Select.Item value="Dimension Forge">
                        Dimension Forge
                      </Select.Item>
                      <Select.Item value="New Horizons">
                        New Horizons
                      </Select.Item>
                      <Select.Item value="Deep Net">Deep Net</Select.Item>
                      <Select.Item value="Graveyard">Graveyard</Select.Item>
                      <Select.Item value="PCB Factory">PCB Factory</Select.Item>
                      <Select.Item value="The Matrix">The Matrix</Select.Item>
                      <Select.Item value="Hack-Battlefield">
                        Hack-Battlefield
                      </Select.Item>
                      <Select.Item value="Testing-Land">
                        Testing-Land
                      </Select.Item>
                      <Select.Item value="War Headquarter">
                        War Headquarter
                      </Select.Item>
                      <Select.Item value="Biometrics Flexible">
                        Biometrics Flexible
                      </Select.Item>
                      <Select.Item value="Beyon Digits">
                        Beyon Digits
                      </Select.Item>
                      <Select.Item value="Open Innovation Lab">
                        Open Innovation Lab
                      </Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="w-full flex flex-col justify-center items-center mt-8 space-y-5">
          {dataToShow.map((prueba, index) => (
            /*<h1 key={index}>{prueba.area}</h1>*/
            <div className="w-[85vw] h-28 bg-[#293038] rounded-xl flex flex-row items-center">
              <div className="md:w-[30vw] flex flex-col pl-9 space-y-2 justify-center">
                <h1 key={index} className="text-2xl font-semibold">
                  {prueba.nombre}
                </h1>
                <h2 key={index} className="text-xl">
                  {prueba.matricula}
                </h2>
              </div>
              <div className="w-[15vw] flex flex-col space-y-2">
                <h1 key={index} className="text-xl">
                  {" "}
                  {prueba.dia}{" "}
                </h1>
                <h2 className="text-2xl font-semibold"> {prueba.fecha} </h2>
              </div>
              <div className="w-[20vw] flex flex-col text-center">
                <h1 key={index} className="text-xl">
                  {" "}
                  {prueba.hora_inicio}
                </h1>
                <h1 key={index} className="text-xl mt-[-6px] mb-[-6px]">
                  {" "}
                  -{" "}
                </h1>
                <h1 key={index} className="text-xl">
                  {" "}
                  {prueba.hora_fin}{" "}
                </h1>
              </div>
              <div className="w-[15vw] flex flex-col space-y-2 ml-7">
                <h1 key={index} className="text-2xl font-semibold">
                  {" "}
                  {prueba.area}{" "}
                </h1>
                <h2 key={index} className="text-xl">
                  {" "}
                  {prueba.espacio}{" "}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sm:hidden block">
        <div className="w-full flex flex-col justify-center items-center mt-8 space-y-5">
          {dataToShow.map((prueba, index) => (
            /*<h1 key={index}>{prueba.area}</h1>*/
            <div className="w-[85vw] h-28 bg-[#293038] rounded-xl flex flex-row items-center justify-around">
              <div className="w-[50vw] pl-2">
                <h1 key={index} className="font-semibold truncate">
                  {" "}
                  {prueba.nombre}{" "}
                </h1>
                <h1 key={index} className="text-xs">
                  {" "}
                  {prueba.matricula}{" "}
                </h1>
                <div className="flex flex-row">
                  <h1 key={index} className="font-semibold">
                    {" "}
                    {prueba.dia}{" "}
                  </h1>
                  <h1 key={index} className="font-semibold">
                    {" "}
                    {prueba.fecha}{" "}
                  </h1>
                </div>
                <div className="flex flex-row">
                  <h1 key={index} className="text-xs">
                    {" "}
                    {prueba.hora_inicio}{" "}
                  </h1>
                  <h1 className="text-xs"> - </h1>
                  <h1 key={index} className="text-xs">
                    {" "}
                    {prueba.hora_fin}{" "}
                  </h1>
                </div>
              </div>
              <div className="w-[28vw]">
                <img
                  src="/areas/social_network.jpeg"
                  className="rounded-xl h-20"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
