'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { data } from "@/data/areas_data";
import { requirements_data, requirements_area } from "@/data/requirements_data";

interface Reservation {
  Day: string;
  StartHour: string;
  EndHour: string;
  SpaceName: string;
  SpaceId: number;
  RequirementsId: string;
  RequirementsQuantity: string;
  GroupCode: string;
}

interface UserData {
  username: string;
  name: string;
  priority: number;
  profile_picture: string;
}

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]}`;
};

const getImage = (id: number): string => {
  const area = data.find((area) => area.id === id);
  return area ? area.image : "/areas/default_image.jpeg";
};

const getRequirements = (requirementsIdString: string, requirementsQuantityString: string): string[] => {
  const requirementsIds = requirementsIdString.split(',').map(Number);
  const requirementsQuantities = requirementsQuantityString.split(',').map(Number);

  return requirementsIds.map((requirementId, index) => {
    const requirement = requirements_data.find(req => req.id === requirementId);
    const quantity = requirementsQuantities[index];
    return requirement ? `${requirement.name}: ${quantity}` : "Unknown Requirement";
  });
};

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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    name: "",
    priority: 0,
    profile_picture: ""
  });
  const [reservationData, setReservationData] = useState<Reservation | null>(null);

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

    const fetchReservationData = async () => {
      try {
        const response = await fetch('/api/reservations');
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setReservationData(data[0]);
          }
        } else {
          throw new Error('Failed to fetch reservation data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
    fetchReservationData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const instructions = reservationData ? getRequirements(reservationData.RequirementsId, reservationData.RequirementsQuantity) : [];

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
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "320px", width: "80%"}} className="relative z-0">
        <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "34px", fontWeight: "bold", textAlign: "center", marginLeft: "150px"}}>{userData.name}</p>
              {/*<p style={{ fontSize: "34px", fontWeight: "bold", textAlign: "center", marginLeft: "150px"}}>Luis Garza</p>
              <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "150px", fontWeight: "lighter"}}>A01252605</p>*/}
              <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "150px", fontWeight: "lighter"}}>{userData.username}</p>
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
              src={reservationData ? getImage(reservationData.SpaceId) : "/areas/default_image.jpeg"}
              alt="Proxima Reservación"
              className="w-80 h-80 mr-4 rounded-lg"
              style={{ objectFit: "cover" }}
            />
            <div className="flex flex-col gap-4 text-center">
              <Rectangle
                iconSrc="/calendar.png"
                title={reservationData ? `${formatDate(reservationData.Day)}` : ""}
                description={reservationData ? `${reservationData.StartHour} - ${reservationData.EndHour}` : "No hay reservaciones"}
              />
              <div className="bg-[#2A3038] flex rounded-lg overflow-hidden p-4" style={{ width:"400px", height: "225px" }}>
                <img
                  src=""
                  alt=""
                  className=""
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white">Instrucciones Especiales</h4>
                  {instructions.length > 0 ? (
                    instructions.map((instruction, index) => (
                      <p key={index} className="text-lg mt-2">{instruction}</p>
                    ))
                  ) : (
                    <p className="text-lg mt-2">No hay instrucciones especiales</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#16191C] text-white p-6 rounded-lg mx-4" style={{ textAlign: "center" }}>
          <h3 className="text-3xl font-bold mb-4">Estadísticas</h3>
          <div className="mt-4 flex flex-col gap-6">
            <Rectangle iconSrc="/calendar.png" title="Reservaciones" description="7"/>
            <Rectangle iconSrc="/clock.png" title="Horas de Experiencia" description="15" />
            <Rectangle iconSrc="/location.png" title="Áreas Descubiertas" description="2/14" />
          </div>
        </div>
      </div>
    </div>
  );
}
