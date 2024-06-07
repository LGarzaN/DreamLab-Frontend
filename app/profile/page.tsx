'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Dialog, TextField, Button, Flex, Text } from "@radix-ui/themes";

const Rectangle = ({ iconSrc, title, description }: { iconSrc: string, title: string, description: string }) => (
  <div className="bg-[#2A3038] flex rounded-lg overflow-hidden p-4">
    <img src={iconSrc} alt={title} className="w-12 h-12 object-cover mr-4 rounded-lg" />
    <div className="flex-1">
      <h4 className="text-xl font-bold text-white">{title}</h4>
      <p className="text-lg mt-2">{description}</p>
    </div>
  </div>
);

export default function Page() {
  const [showPopup, setShowPopup] = useState(false);
  const blurStyle = showPopup ? "blur-md" : "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ username: string; name: string; priority: number, profile_picture: string}>({ 
    username: "", 
    name: "", 
    priority: 0,
    profile_picture: ""
  });
  const togglePopup = async () => {
    setShowPopup(!showPopup);
    console.log("Popup toggled:", !showPopup);

  };
  

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          setUserData(data.usuario);
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Navbar />
      <div>
        <img
          src="/techimg.png"
          alt="Tech Image"
          //style={{
            //width: "100%",
            //maxHeight: "40vh",
            //objectFit: "cover"
          //}}
          className="absolute inset-0 w-full max-h-[40vh] object-cover"
        />
        
        <img
            //src={userData.profile_picture}
            src="/profilepic.jpeg"
            alt=""
            className="w-[200px] h-[200px] rounded-full absolute inset-0 mt-48 ml-24"
            style={{ zIndex: 10 }}
            //style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "50%", marginRight: "20px" }}
          />
        <button className="hover:bg-opacity-75" onClick={() => {togglePopup(); console.log("Button clicked!")}}>
          <img
            
            src="/pencil.svg"
            alt=""
            className="w-[50px] h-[50px] absolute inset-0 mt-44 ml-60"
            style={{ zIndex: 10 }}
            
          />
          </button>
        
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "320px", width: "80%"}} className="relative z-0">
        <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "34px", fontWeight: "bold", textAlign: "center", marginLeft: "170px"}}>{userData.name}</p>
              {/*<p style={{ fontSize: "34px", fontWeight: "bold", textAlign: "center", marginLeft: "150px"}}>Luis Garza</p>
              <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "150px", fontWeight: "lighter"}}>A01252605</p>*/}
              <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "170px", fontWeight: "lighter"}}>{userData.username}</p>
            </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "30px", fontWeight:"initial" }}>Prioridad: {userData.priority}</p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="bg-[#16191C] text-white p-6 rounded-lg mx-4" style={{ textAlign: "center" }}>
          <h3 className="text-3xl font-bold mb-4">Proxima Reservación</h3>
          <div className="flex items-center justify-center">
            <img
              src="/Lego Room.png"
              alt="Proxima Reservación"
              className="w-80 h-80 mr-4 rounded-lg"
              style={{ objectFit: "cover" }}
            />
            <div className="flex flex-col gap-4 text-center">
              <Rectangle
                iconSrc="/calendar.png"
                title="Lunes, 4 de Marzo"
                description="15:00 - 17:00"
              />
              <div className="bg-[#2A3038] flex rounded-lg overflow-hidden p-4" style={{ width:"400px", height: "225px" }}>
                <img
                  src=""
                  alt=""
                  className=""
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white">Instrucciones Especiales</h4>
                  <p className="text-lg mt-2">Llevar Laptop</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#16191C] text-white p-6 rounded-lg mx-4" style={{ textAlign: "center" }}>
          <h3 className="text-3xl font-bold mb-4">Estadísticas</h3>
          <div className="mt-4 flex flex-col gap-6">
            <Rectangle iconSrc="/calendar.png" title="Reservaciones" description="7"/>
            <Rectangle iconSrc="/clock.png" title="Horas de Aprendizaje" description="15" />
            <Rectangle iconSrc="/location.png" title="Áreas Descubiertas" description="2/14" />
          </div>
        </div>
      </div>

      {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-[#1c2223] p-8 rounded-lg relative" style={{ width: '400px', height: '200px' }}>
                  <button onClick={togglePopup} className="absolute top-3 right-3 text-white font-bold">X</button>
                  <h2 className="text-white mb-4 text-3xl">Cambiar foto de perfil</h2>
                  <input type="file" accept="image/*" className="text-white mb-6" />
                  <Button
                    variant="soft"
                    color="violet"
                    className="hover:cursor-pointer"
                    style={{ fontSize: '16px', padding: '10px 20px' }}
                    >
                   Subir foto
                  </Button>
              </div>
          </div>
      )}


    </div>
  );
}
