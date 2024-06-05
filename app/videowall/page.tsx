"use client";
import React, { useEffect, useState } from "react";
import Videowall_bar from "../components/Videowall_bar";
import axios from "axios";
import ReservationCard from "./ReservationCard";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ReservationCarousel from './Carousel';
import NewsCarrousel from "./News";

function Page() {
  const [reservations, setReservations] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/reservations", {
          headers: {
            "source": "videowall"
          }
        });
        setReservations(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchNews = async () => {
      try {
        const res = await axios.get("/api/news");
        setNews(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
    fetchNews();
  }, []);

  useEffect(() => {
    if (reservations.length > 4) {
      setReservations(reservations.slice(0, 4));
    }
  }, [reservations]);

  return (
    <div className="w-[3840px] relative h-[1080px] bg-gradient-to-t from-[#010135] to-[#00001C] flex justify-center items-center">
      <div className="absolute inset-0 flex justify-center items-center">
        <video autoPlay loop muted className="h-full w-[1750px] object-cover">
          <source
            src="/videowall/videowall.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="z-10 text-white w-full h-full flex flex-row mt-20">
        <div className="h-full w-[33%] ">
          <div className="w-full mt-10 flex justify-center ">
            <p className="text-4xl font-bold">Próximas Reservaciones</p>
          </div>
          <div className="h-[40%] w-full  p-10">
          <div className="container mx-auto ">
            <ReservationCarousel reservations={reservations} />
          </div>
          </div>
          <div className="h-[50%] flex w-full justify-start items-center flex-col">
              <p className="text-4xl font-semibold">Noticias</p>
              <div className="mt-10 flex flex-row gap-10 w-full h-[70vh]">
                {news && <NewsCarrousel newsArray={news} />}
              </div>
          </div>
        </div>
        <div className="h-full w-[34%]  flex justify-center">
          <div className="absolute bottom-20">
            <Videowall_bar />
          </div>
          
        </div>
        <div className="h-full w-[32%] ">
          <div className="w-full h-[80%] ">
            <p className="text-4xl font-semibold text-center mt-20">Espacios Disponibles</p>
            <div className="w-full h-[90%] flex flex-row mt-10 ">
                <div className="w-1/2 h-full  flex flex-col">
                  <div className=" h-1/2 w-full p-10 px-20 rounded-xl">
                    <div className="w-full h-full ">
                      <img src="/Lego Room.png" alt="" className="h-[80%] w-full object-cover rounded-xl "/>
                      <div className="w-full h-[20%] pt-5 flex flex-row justify-between px-3 ">
                        <p className="text-4xl font-semibold">Lego Room </p>
                        <p className="text-red-400 text-4xl font-semibold">11/12</p>
                      </div>
                    </div>
                  </div>
                  <div className=" h-1/2 w-full p-10 px-20 ">
                    <div className="w-full">
                      <img src="/areas/graveyard.jpeg" alt="" className="h-[80%] w-full object-cover rounded-xl"/>
                      <div className="w-full h-[20%] pt-5 flex flex-row justify-between px-3 ">
                        <p className="text-4xl font-semibold">Graveyard</p>
                        <p className="text-green-400 text-4xl font-semibold">1/4</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 h-full p-10 px-20">
                  <div className="w-full h-full ">
                    <img src="/areas/deep_net.jpeg" alt="" className="h-[80%] w-full object-cover rounded-xl"/>
                    <div className="w-full h-[20%] pt-5 flex flex-row justify-between px-3">
                      <p className="text-4xl font-semibold ">Deep Net</p>
                      <p className="text-orange-400 text-4xl font-semibold">6/10</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Page;

/*
    <div className="h-[1080px] w-[200vw] bg-gradient-to-t from-[#010135] to-[#00001C] flex flex-row">
      <div className="w-[1200px] flex flex-col border-red-500 border-2">
        <div className="w-full mt-10 flex justify-center">
          <p className="text-4xl font-bold">Próximas Reservaciones</p>
        </div>
        <div className="h-[60%] w-full border-red-500 border-2 p-10">
        <div className="grid grid-cols-2 gap-y-10">
          {reservations.map((item, index) => (
            <ReservationCard key={index} reservation={item} />
          ))}
        </div>
        </div>
      </div>

      <div className="w-[1920px]">
        <div className="relative h-full w-full place-content-center">
          <video autoPlay loop muted className="w-full h-full object-cover border-yellow-500 border-2">
            <source
              src="/videowall/videowall.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 flex justify-center items-end mb-20">
            <Videowall_bar />
          </div>
        </div>
      </div>

      <div className="w-[960px]">h</div>
    </div>
*/