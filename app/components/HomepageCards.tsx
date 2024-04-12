"use client";
import React from "react";
import Image from "next/image";
import { Dialog, TextField, Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

function HomepageCards({
  keyword,
  specificArea,
}: {
  keyword: string;
  specificArea: string;
}) {
  const data = [
    {
      name: "Social Networking",
      image: "/areas/social_network.jpeg",
      alt: "Social Networking",
      area: "Espacios Abiertos",
      link: "/social-networking",
      descripcion:
        "Acceso abierto para colaborar e interactuar con un videowall interactivo. No requiere registro previo.",
      id: 1,
    },
    {
      name: "Lego Room",
      image: "/areas/lego_room.jpeg",
      alt: "Lego Room",
      area: "Espacios Abiertos",
      link: "/lego-room",
      descripcion:
        "Espacio creativo para estudiantes del área, con reserva previa para construir y diseñar con bloques Lego.",
      id: 2,
    },
    {
      name: "Electric Garage",
      image: "/areas/electric_garage.jpeg",
      alt: "Electric Garage",
      area: "Garage Valley",
      link: "/electric-garage",
      descripcion:
        "Taller equipado para proyectos de robótica e ingeniería para estudiantes de IRS.",
      id: 3,
    },
    {
      name: "Dimension Forge",
      image: "/areas/dimension_forge.jpeg",
      alt: "Dimension Forge",
      area: "Garage Valley",
      link: "/dimension-forge",
      descripcion:
        "Estudio avanzado para creación en 3D con impresoras y escáneres de última generación.",
      id: 4,
    },
    {
      name: "New Horizons",
      image: "/areas/new_horizons.jpeg",
      alt: "New Horizons",
      area: "Garage Valley",
      link: "/new-horizons",
      descripcion:
        "Espacio de realidad virtual y aumentada con instalación de Holodeck para inmersión total.",
      id: 5,
    },
    {
      name: "Deep Net",
      image: "/areas/deep_net.jpeg",
      alt: "Deep Net",
      area: "Garage Valley",
      link: "/deep-net",
      descripcion:
        "Zona para pruebas de infraestructura de redes, ideal para proyectos de investigación y desarrollo.",
      id: 6,
    },
    {
      name: "Graveyard",
      image: "/areas/graveyard.jpeg",
      alt: "Graveyard",
      area: "Garage Valley",
      link: "/graveyard",
      descripcion:
        "Espacio de reutilización de equipo tecnológico para ensamblar y reparar computadoras y servidores.",
      id: 7,
    },
    {
      name: "PCB Factory",
      image: "/areas/pcb_factory.jpeg",
      alt: "PCB Factory",
      area: "Garage Valley",
      link: "/pcb-factory",
      descripcion:
        "Equipado para la creación y montaje de circuitos impresos, localizado en CETEC para amantes de la electrónica.",
      id: 8,
    },
    {
      name: "The Matrix",
      image: "/areas/the_matrix.webp",
      alt: "The Matrix",
      area: "Garage Valley",
      link: "/the-matrix",
      descripcion:
        "Centro tecnológico para acceso a software especializado, máquinas virtuales, y bases de datos.",
      id: 9,
    },
    {
      name: "Hack-Battlefield",
      image: "/areas/hack_battlefield.jpeg",
      alt: "Hack-Battlefield",
      area: "Zona de X-Ploración",
      link: "/hack-battlefield",
      descripcion:
        "Espacio especializado para alumnos de ciberseguridad, equipado para prácticas y desarrollos en seguridad informática.",
      id: 10,
    },
    {
      name: "Testing-Land",
      image: "/areas/testing_land.webp",
      alt: "Testing-Land",
      area: "Zona de X-Ploración",
      link: "/testing-land",
      descripcion:
        "Área preparada con cámaras y audio para pruebas de usabilidad y compatibilidad en software, con enfoque en UX/UI, ideal para ITC e ITD.",
      id: 11,
    },
    {
      name: "War Headquarter",
      image: "/areas/war_headquarters.png",
      alt: "War Headquarter",
      area: "Zona de X-Ploración",
      link: "/war-headquarter",
      descripcion:
        "Sala de juntas diseñada para emular los centros de decisión ejecutiva, destinada a estrategias y deliberaciones críticas.",
      id: 12,
    },
    {
      name: "Biometrics Flexible ",
      image: "/areas/biometrics_flexible_hall.png",
      alt: "Biometrics Flexible Hall",
      area: "Zona de X-Ploración",
      link: "/biometrics-flexible-hall",
      descripcion:
        "Amplio salón con tecnología biométrica avanzada, adaptable para hackatones y observación, capaz de subdividirse para eventos menores.",
      id: 13,
    },
    {
      name: "Beyon-Digits",
      image: "/areas/beyon_digits.jpeg",
      alt: "Beyon-Digits",
      area: "Zona de X-Ploración",
      link: "/beyon-digits",
      descripcion:
        "Ambiente tecnológico con videowalls para visualización y trabajo colaborativo en proyectos digitales.",
      id: 14,
    },
    {
      name: "Open Innovation Lab",
      image: "/areas/open_innovation_lab.webp",
      alt: "Open Innovation Lab",
      area: "Zona de X-Ploración",
      link: "/open-innovation-lab",
      descripcion:
        "Espacio reservado para docentes y staff enfocado en la investigación, disponible para reservas exclusivas por parte del profesorado.",
      id: 15,
    },
  ];
  const filteredData = data.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(keyword.toLowerCase());
    const areaMatch =
      specificArea.trim() === "" ||
      item.area.toLowerCase() === specificArea.toLowerCase();

    if (keyword.trim() === "") {
      return areaMatch;
    } else {
      return nameMatch && areaMatch;
    }
  });

  return (
    <div className="flex justify-center">
      <div className="w-[90%] lg:w-[65.4%] flex flex-wrap justify-start min-h-[80vh]">
        {filteredData.map((item) => (
          <Dialog.Root>
            <Dialog.Trigger>
              <div key={item.id}>
                <div className="m-4 ">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    height={200}
                    width={200}
                    className="rounded-lg object-cover h-28 w-36 lg:h-40 lg:w-52 hover:brightness-50 transition ease-in-out delay-100"
                  />
                  <div className="text-sm lg:text-xl font-semibold tracking-wide ">
                    {item.name}
                  </div>
                  <div className="text-xs lg:text-base font-light tracking-wide text-slate-400">
                    {item.area}
                  </div>
                </div>
              </div>
            </Dialog.Trigger>

            <Dialog.Content>
              <div className="flex items-center">
                <Image
                      src={item.image}
                      alt={item.alt}
                      height={200}
                      width={200}
                      className="rounded-lg object-cover h-28 w-36 lg:h-40 lg:w-52 hover:brightness-50 transition ease-in-out delay-100"
                    />
                  <div className=" grid justify-items-stretch ml-4">
                    
                    <div className="text-3xl font-bold">
                      {item.name}
                    </div>
                    <div>
                      {item.descripcion}
                    </div>
                    <div className="justify-self-center mt-4	">
                      <Dialog.Close>
                        <Link href={{
                          pathname:"/reserva_hora",
                          query: {
                            name:item.name,
                            image:item.image,
                          },
                        }}>
                          <Button variant="soft" color="violet">
                              Reservar ahora
                            </Button>
                        </Link>
                          
                      </Dialog.Close>
                    </div>
                  </div>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        ))}
      </div>
    </div>
  );
}

export default HomepageCards;
