"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Box } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import HourCards from "../components/HourCards";
import axios from "axios";
import HourChooser from "./hour";
import { Separator } from "@radix-ui/themes";
import Link from "next/link";
import RequirementsChooser from "./requirements";
import { data } from "@/data/areas_data";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function getName(id: number) {
  const area = data.find((area) => area.id === id);
  return area ? area.name : null;
}

function getImage(id: number) {
  const area = data.find((area) => area.id === id);
  return area ? area.image : null;
}

function Page() {
  const [page, setPage] = useState(0);
  const sp = useSearchParams();

  const [id, setId] = useState(1);
  const [name, SetName] = useState("");
  const [bgImage, SetBgImage] = useState("");

  const [date, SetDate] = useState(" Viernes 19 de Abril del 2024");
  const [inicio, SetInicio] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [data, setData] = useState([]);
  const [requirements, setRequirements] = useState("");
  const [scheduleId, setScheduleId] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleClick = async () => {
    if (page == 0) {
      setPage(page + 1);
      
    } else {
      setLoading(true);
      const res = await axios.post(`/api/reservations/`, {
        schedule_id: scheduleId,
        user_requirements: "1=1,2=1",
        space_id: id,
      });

      if (res.status === 200) {
        toast.success("Reservación realizada con éxito");
        setLoading(false);
        window.location.href = "/";
      } else {
        setLoading(false);
        toast.error("Error al realizar la reservación");
      }
    }
  };

  useEffect(() => {
    const id_temporal = sp.get("id") || "1";
    const id = parseInt(id_temporal);
    const bg_image = getImage(id) || "/areas/social_network.jpeg";
    const name = getName(id) || "Social Network";

    setId(id);

    SetBgImage(bg_image);
    SetName(name);

    setStart(parseInt(inicio));
    setEnd(parseInt(inicio) + 1);

    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/schedule/`, { id: id });
        const data = response.data;
        setLoading(false);
        setData(data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching schedule:", error);
      }
    };

    fetchData();
  }, [sp, inicio]);

  return (
    <div className="h-screen">
      <div className="relative w-full">
        <img
          src={bgImage}
          alt="Descripción"
          className="w-full h-[35vh] object-cover md:opacity-70 opacity-50"
        />
        <section className="absolute inset-0 flex flex-col items-center justify-center lg:items-start">
          <div className="text-center lg:pl-16 lg:text-start text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
            {" "}
            {name}{" "}
          </div>
        </section>
      </div>

      {page === 0
        ? HourChooser(
            id,
            inicio,
            SetInicio,
            date,
            SetDate,
            data,
            scheduleId,
            setScheduleId,
            loading
          )
        : RequirementsChooser(date, start, end, requirements, setRequirements)}

      <div className="w-full justify-center">
        <Separator size="4" />
        <section className="flex flex-col lg:flex-row items-center lg:justify-around mt-10 w-full mb-10">
          <div className="w-60 flex flex-col justify-center items-center">
            <h1 className="font-bold pb-2"> Inicia: </h1>
            <div className="w-60 h-12 border-2	border-white rounded-full flex justify-center items-center">
              {inicio !== "" && <p>{parseInt(inicio)} hrs</p>}
              {inicio == "" && <p>hrs</p>}
            </div>
          </div>
          <div className="w-60 flex flex-col justify-center items-center mt-5 md:mt-0">
            <h1 className="font-bold pb-2"> Termina: </h1>
            <div className="w-60 h-12 border-2	border-white rounded-full flex justify-center items-center">
              {inicio !== "" && <p>{parseInt(inicio) + 1} hrs</p>}
              {inicio == "" && <p>hrs</p>}
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleClick}
                className="w-56 h-12 mt-5 md:mt-0 rounded-full bg-[#5FA256] hover:bg-[#45783E] transition-all text-2xl"
              >
                {page === 0 ? "Siguiente": loading ? <div className="flex w-full h-full justify-center items-center"><ClipLoader color="white" size={20}/></div>: "Reservar"}
                
              </button>
              <Link
                href="/"
                className="mt-2 text-red-500 underline font-bold hover:text-red-800 transition-all"
              >
                Cancelar
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
