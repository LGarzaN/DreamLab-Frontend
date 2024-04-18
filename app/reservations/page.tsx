"use client";
import { useEffect, useState } from "react";
import HourChooser from "./hour";
import { Separator } from "@radix-ui/themes";
import Link from "next/link";
import RequirementsChooser from "./requirements";
import { useSearchParams } from "next/navigation";
import { data } from "@/data/areas_data";

function getName(id: number) {
  const area = data.find((area) => area.id === id);
  return area ? area.name : null;
}

function getImage(id: number) {
  const area = data.find((area) => area.id === id);
  return area ? area.image : null;
}

export default function Page() {
  const [page, setPage] = useState(0);
  const [inicio, SetInicio] = useState("10");
  const [date, SetDate] = useState(" Viernes 19 de Abril del 2024");
  const [bgImage, SetBgImage] = useState("");
  const [name, SetName] = useState("");
  const sp = useSearchParams();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const handleClick = () => {
    setPage(1);
  };

  useEffect(() => {
    const id_temporal = sp.get("id") || "1";
    const id = parseInt(id_temporal);
    const bg_image = getImage(id) || "/areas/social_network.jpeg";
    const name = getName(id) || "Social Network";

    SetBgImage(bg_image);
    SetName(name);

    setStart(parseInt(inicio));
    setEnd(parseInt(inicio) + 1);
  })
  
  const PageDisplay = () => {
    if (page === 0) {
      return HourChooser(inicio, SetInicio, date, SetDate);
    } else{
      return RequirementsChooser(date, start, end);
    }
  }
  ;

  return (
    <div className="">
      <div className="relative w-full">
        <img
          src={bgImage}
          alt="Descripción"
          className="w-full h-[40vh] object-cover md:opacity-70 opacity-50"
        />
        <section className="absolute inset-0 flex flex-col items-center justify-center lg:items-start">
          <div className="text-center lg:pl-16 lg:text-start text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
            {" "}
            {name}{" "}
          </div>
        </section>
      </div>

      <div className="Body">
        {PageDisplay()}
      </div>

      <div className="w-full justify-center ">
        <Separator size="4" />
        <section className="flex flex-col lg:flex-row items-center lg:justify-around mt-10 w-full mb-10">
          <div className="w-60 flex flex-col justify-center items-center">
            <h1 className="font-bold pb-2"> Inicia: </h1>
            <div className="w-60 h-12 border-2	border-white rounded-full flex justify-center items-center">
            {inicio !== "" && (
            <p>{parseInt(inicio)} hrs</p>
            )}
            </div>
          </div>
          <div className="w-60 flex flex-col justify-center items-center mt-5 md:mt-0">
            <h1 className="font-bold pb-2"> Termina: </h1>
            <div className="w-60 h-12 border-2	border-white rounded-full flex justify-center items-center">
            {inicio !== "" && (
            <p>{parseInt(inicio) + 1} hrs</p>
            )}
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleClick}
                className="w-60 h-12 mt-5 md:mt-0 rounded-full bg-[#5FA256] hover:bg-[#45783E] "
              >
                <h1 className="font-bold text-2xl">Continuar</h1>
              </button>
              <Link
                href=""
                className="mt-2 text-red-500 underline font-bold hover:text-red-800"
              >
                {" "}
                Cancelar{" "}
              </Link>
            </div>
          </div>
        </section>
          </div>
    </div>
  );
}
