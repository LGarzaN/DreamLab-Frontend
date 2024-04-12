"use client";
import React, { useEffect, useState } from "react";
import HomepageCards from "./components/HomepageCards";
import { Tabs, Box, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Page() {
  const [name, setName] = useState("");

  const scrollToSection = () => {
    const targetSection = document.getElementById("areas");
    targetSection!.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="">
      <Navbar />
      <div className="relative w-full">
        <img
          src="/areas/new_horizons2.jpeg"
          alt="Descripción"
          className="w-full h-[90vh] object-cover md:opacity-100 opacity-50"
        />

        <section className="absolute inset-0 flex flex-col items-center justify-center lg:items-start">
          <div className="text-center lg:pl-16 lg:w-[40vw] lg:text-start">
            <p className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
              Sumérgete en la educación del futuro
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl tracking-wide font-light text-white mt-3 mb-5">
              Aprende de manera interactiva y con la tecnología más nueva
            </p>
            <div className="flex justify-center items-center lg:justify-start">
              <Link href="/chatbot" className="flex justify-center items-center h-[40px] lg:h-[50px] w-[200px] lg:w-[300px] rounded-full bg-[#726FF5] transition ease-in-out delay-100 hover:bg-[#5654BE] hover:text-slate-300 ">
                <p className="self-center font-bold md:text-xl"> Reserva Ahora </p>
              </Link>
            </div>
            <button onClick={scrollToSection} className="mt-2">
              <div className="h-[50px] w-[300px] justify-center content-center transition ease-in-out delay-100">
                <h1 className="flex justify-center underline underline-offset-4 hover:text-[#abaaff] transition-all"> Reserva Manual </h1>
              </div>
            </button>
          </div>
        </section>
      </div>

      <div id="areas" className="flex justify-center p-12 text-5xl font-bold text-center">
        Espacios Disponibles
      </div>

      <div className="flex justify-center ">
        <input //cambiar a input de radix
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Busca un area"
          className="flex justify-center  w-4/5 lg:w-2/5 p-2.5 rounded-lg text-sm bg-[#293038]  "
        />
      </div>
      
      <div className="">
        <Tabs.Root
          defaultValue="todos"
          className="hidden sm:block md:block lg:block xl:block"
        >
          <div className="flex justify-center text-xl ">
            <Tabs.List className="w-full lg:w-[65.4%] flex justify-center">
              <Tabs.Trigger value="todos">
                {" "}
                <Text size={{ initial: "1", lg: "3" }}>Todos</Text>{" "}
              </Tabs.Trigger>
              <Tabs.Trigger value="espacio_abierto">
                {" "}
                <Text size={{ initial: "1", lg: "3" }}>
                  Espacios Abiertos
                </Text>{" "}
              </Tabs.Trigger>
              <Tabs.Trigger value="garage_valley">
                {" "}
                <Text size={{ initial: "1", lg: "3" }}>Garage Valley</Text>{" "}
              </Tabs.Trigger>
              <Tabs.Trigger value="zona_xploracion">
                {" "}
                <Text size={{ initial: "1", lg: "3" }}>
                  Zona de Xploracion
                </Text>{" "}
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Box pt="3">
            <Tabs.Content value="todos">
              <HomepageCards keyword={name} specificArea="" />
            </Tabs.Content>

            <Tabs.Content value="espacio_abierto">
              <HomepageCards keyword={name} specificArea="Espacios Abiertos" />
            </Tabs.Content>

            <Tabs.Content value="garage_valley">
              <Text size="2">
                <HomepageCards keyword={name} specificArea="Garage Valley" />
              </Text>
            </Tabs.Content>

            <Tabs.Content value="zona_xploracion">
              <HomepageCards
                keyword={name}
                specificArea="Zona de X-Ploración"
              />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </div>
      <div className="md:hidden lg:hidden xl:hidden">
        <HomepageCards keyword={name} specificArea="" />
      </div>
    </div>
  );
}
