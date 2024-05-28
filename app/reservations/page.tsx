"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import HourChooser from "./hour";
import { Button, Separator } from "@radix-ui/themes";
import Link from "next/link";
import RequirementsChooser from "./requirements";
import { data } from "@/data/areas_data";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import { AnimatePresence, motion } from "framer-motion";

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
  const [popup, setPopup] = useState(false);

  const handleReservation = async () => {
    setPopup(false);
    const prom = new Promise<void>(async (resolve, reject) => {
      const res = await axios.post(`/api/reservations/`, {
        schedule_id: scheduleId,
        user_requirements: "1=1,2=1",
        space_id: id,
      });

      if (res.status === 200) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(prom, {
      loading: "Creando Reservación...",
      success: "Reservación creada con exito",
      error: "Error al crear Reservación",
    }, {style: {backgroundColor: "#121417", color: "white"}});

    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.location.href = "/";
  }

  const handleClick = async () => {
    if (page == 0) {
      if (inicio === "") {
        toast.error("Selecciona una hora de inicio");
        return;
      }
      setPage(page + 1);
    } else {
      setPopup(true);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id_temporal = searchParams.get("id") || "1";
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
  }, [inicio]);

  return (
    <div className="h-screen">
      <Navbar />
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

      <div className={`w-full justify-center`}>
        <Separator size="4" />
        <section className="flex flex-col lg:flex-row items-center lg:justify-around mt-6 w-full mb-10">
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
                {page === 0 ? "Siguiente" : loading ? (
                  <div className="flex w-full h-full justify-center items-center">
                    <ClipLoader color="white" size={20} />
                  </div>
                ) : (
                  "Reservar"
                )}
              </button>
              <Link
                href="/"
                className="mt-2 text-red-400 underline font-bold hover:text-red-500 transition-all"
              >
                Cancelar
              </Link>
            </div>
          </div>
        </section>
      </div>
      <AnimatePresence>
      {popup && (

        <motion.div 
        className="w-full h-full z-20 absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-50"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.1}}>
          <div className="bg-[#1a191b] border-[#262527] border-2 rounded-xl w-[40%] h-[45%] px-10 py-8">
            <div className="w-full h-[85%] gap-y-4 flex flex-col">
              <p className="text-2xl text-center font-semibold">¡Espera!</p>
              <p className="text-lg text-gray-300">Recuerda que esto no garantiza tu reservación, todavia debe ser confirmada por el DREAM Lab.</p>
              <p className="text-gray-400 mb-8">
                        Para más información sobre el proceso de asignación de espacios, visita nuestra página de 
                        <a href="/faq" className="text-blue-500"> Información</a>.
                    </p>
            </div>
            <div className="gap-x-5 flex">
              <Button variant="soft" color="gray" onClick={() => setPopup(false)} size={"3"}>
                  Regresar
              </Button>
              <Button variant="surface" color="green" size={"3"} onClick={handleReservation}>
                Reservar
              </Button>
            </div>
          </div>
        </motion.div>
       
      )}
      </AnimatePresence>
    </div>
  );
}

export default Page;
