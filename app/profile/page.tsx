'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Rectangle = ({ iconSrc, title, description }: { iconSrc: string, title: string, description: string }) => (
  <div className="bg-gray-700 flex rounded-lg overflow-hidden p-4">
    <img src={iconSrc} alt={title} className="w-12 h-12 object-cover mr-4 rounded-lg" />
    <div className="flex-1">
      <h4 className="text-xl font-bold text-white">{title}</h4>
      <p className="text-lg mt-2">{description}</p>
    </div>
  </div>
);

export default function Page() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ username: string; name: string; priority: number, profile_picture: string}>({ 
    username: "", 
    name: "", 
    priority: 0,
    profile_picture: ""
  });

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Navbar />
      <img
        src="/techimg.png"
        alt="Tech Image"
        style={{
          width: "100%",
          maxHeight: "40vh",
          objectFit: "cover"
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", width: "80%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={userData.profile_picture}
            alt=""
            style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "50%", marginRight: "20px" }}
          />
          <div>
            <p style={{ fontSize: "34px", fontWeight: "bold", textAlign: "center" }}>{userData.name}</p>
            <p style={{ fontSize: "22px", fontStyle: "italic", textAlign: "left" }}>{userData.username}</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>Prioridad: {userData.priority}</p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="bg-gray-900 text-white p-6 rounded-lg mx-4" style={{ textAlign: "center" }}>
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
              <div className="bg-gray-700 flex rounded-lg overflow-hidden p-4" style={{ width:"400px", height: "225px" }}>
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

        <div className="bg-gray-900 text-white p-6 rounded-lg mx-4" style={{ textAlign: "center" }}>
          <h3 className="text-3xl font-bold mb-4">Estadísticas</h3>
          <div className="mt-4 flex flex-col gap-6">
            <Rectangle iconSrc="/calendar.png" title="Reservaciones" description="7" />
            <Rectangle iconSrc="/clock.png" title="Horas de Aprendizaje" description="15" />
            <Rectangle iconSrc="/location.png" title="Áreas Descubiertas" description="2/14" />
          </div>
        </div>
      </div>
    </div>
  );
}
