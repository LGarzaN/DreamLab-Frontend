"use client";
import React, { useEffect, useState } from "react";
import Videowall_bar from "../components/Videowall_bar";
import axios from "axios";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ReservationCarousel from './Carousel';
import NewsCarrousel from "./News";
import { data } from "@/data/areas_data";
import Slider from "react-slick";

function getName(id: number) {
  const area = data.find((area) => area.id === id);
  return area ? area.name : null;
}

function getImage(id: number) {
  const area = data.find((area) => area.id === id);
  return area ? area.image : null;
}

function Page() {
  const [reservations, setReservations] = useState([]);
  const [news, setNews] = useState([]);
  const [availableSpaces, setAvailableSpaces] = useState([]);
  const [bigSpace, setSpace] = useState(null);

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

    const fetchAvailableSpaces = async () => {
      try {
        const res = await axios.get("/api/reservations/available");
        const data = res.data;
        setSpace(data.shift());
        setAvailableSpaces(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
    fetchNews();
    fetchAvailableSpaces();
  }, []);

  // useEffect(() => {
  //   if (reservations.length > 4) {
  //     setReservations(reservations.slice(0, 4));
  //   }
  // }, [reservations]);

  const settings = {
      dots: false,
      infinite: true,
      vertical: true,
      speed: 5000,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4990, // Adjust the autoplay speed for smoother effect
      cssEase: 'linear', 
  };

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
            {availableSpaces && availableSpaces.length > 0 && bigSpace && (
            <div className="w-full h-[90%] flex flex-row mt-6 ">
              <div className="w-1/2 h-full pt-10">
                <Slider {...settings} arrows={false} dots={false} className="h-full">
                  {availableSpaces.map((space, index) => (
                    <div key={index} className="w-full h-1/2 flex flex-col px-5 mb-10">
                      <div className="h-1/2 w-full">
                        <img src={getImage(space["SpaceId"]) ?? ""} className="h-[300px] w-full object-cover rounded-xl"/>
                      </div>
                      <div className="w-full flex flex-row justify-between mt-4">
                        <p className="text-2xl font-semibold text-center">{getName(space["SpaceId"])}</p>
                        <p className={`text-2xl font-semibold text-center ${space["Reservations"] >= 3 ? "text-red-300": "text-green-400"}`}>{space["Reservations"]}/5</p>
                      </div>
                    </div>
                    ))}
                  </Slider>
                </div>
                <div className="w-1/2 h-full p-10 px-20">
                  <div className="w-full h-full ">
                    <img src={getImage(bigSpace["SpaceId"] ?? 0) || ""} alt="" className="h-[80%] w-full object-cover rounded-xl"/>
                    <div className="w-full h-[20%] pt-5 flex flex-row justify-between px-3">
                      <p className="text-2xl font-semibold ">{getName(bigSpace["SpaceId"] ?? 0)}</p>
                      <p className={`text-2xl font-semibold ${bigSpace["Reservations"] >= 3 ? "text-red-300": "text-green-400"}`}>{bigSpace["Reservations"]}/5</p>
                    </div>
                  </div>
              </div>
            </div>
            )}
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