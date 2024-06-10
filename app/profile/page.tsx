'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { data } from "@/data/areas_data";
import { requirements_data, requirements_area } from "@/data/requirements_data";
import axios from "axios";
import { Dialog, TextField, Button, Flex, Text, AlertDialogCancel } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

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
  profile_picture: string | null;
}

interface UserStatistics {
  Reservations: number;
  StudyHours: number;
  ExploredAreas: number;
}

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return `${parseInt(day)} ${months[parseInt(month) - 1]}`;
};

const getImage = (id: number): string => {
  const area = data.find((area) => area.id === id);
  return area ? area.image : "/areas/default_image.jpeg";
};

const getRequirements = (requirementsIdString: string, requirementsQuantityString: string): string[] => {
  if (!requirementsIdString || !requirementsQuantityString) return ["No requirements specified"];

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
    profile_picture: null
  });
  const [reservationData, setReservationData] = useState<Reservation | null>(null);
  const [userStats, setUserStats] = useState<UserStatistics>({
    Reservations: -1,
    StudyHours: -1,
    ExploredAreas: -1
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleImageUpload = async () => {
    const prom = new Promise((resolve, reject) => {
      if (!uploadedFile) {
        reject("No file uploaded");
      }
      // get image from uploadedFile variable
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile!);
      reader.onloadend = () => {
        const base64data = reader.result;
        // send image to the server
        axios.put('/api/profile-picture', { profilePicture: base64data })
          .then(() => resolve("Image uploaded successfully"))
          .catch(() => reject("Error uploading image"));
      };
    });

    toast.promise(prom, {
      loading: "Guardando Imagen...",
      success: "Imagen guardada exitosamente",
      error: "Error al guardar la imagen"
    }, {style: {backgroundColor: "#121417", color: "white"}}).then(() => {
      new Promise((resolve) => setTimeout(resolve, 750)).then(() => window.location.reload());
    })
  }

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

    const fetchUserStatistics = async () => {
      try {
        const response = await axios.get('/api/statistics');
        if (response.status === 200) {
          setUserStats(response.data[0]);
        } else {
          throw new Error('Failed to fetch user statistics');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch user statistics');
      }
    };
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get('/api/profile-picture');
        if (response.status === 200) {
          const data = response.data;  // No need to await here
          console.log('Fetched Data:', data);  // Debug: Log the fetched data
          if (typeof data === 'string') {
            const url = decodeURIComponent(data);
            console.log('Generated URL:', url);  // Debug: Log the generated URL
            setUserData((prev) => ({ ...prev, profile_picture: url }));
          } else {
            throw new Error('Invalid data format');
          }
        } else {
          throw new Error('Failed to fetch profile picture');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch profile picture');
      }
    };
    
    fetchProfilePicture();  
    fetchProfileData();
    fetchReservationData();
    fetchUserStatistics();
  }, []);

  if (loading) {
    return (<div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <ClipLoader color="#ffffff" loading={loading} size={75} />
    </div>);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const instructions = reservationData ? getRequirements(reservationData.RequirementsId, reservationData.RequirementsQuantity) : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Navbar />
      <div className="">
        <img
          src="/techimg.png"
          alt="Tech Image"
          className="absolute inset-0 w-full max-h-[30vh] object-cover"
        />
        <img
          src={userData.profile_picture || "/profilepic.jpeg"}
          alt="Profile Picture"
          className="w-[200px] h-[200px] rounded-full absolute inset-0 mt-28 ml-24"
          style={{ zIndex: 10 }}
        />
        <Dialog.Root>
          <Dialog.Trigger className="hover:cursor-pointer">
          <img

            src="/pencil.png"
            alt=""
            className="w-[40px] h-[40px] absolute inset-0 mt-32 ml-64"
            style={{ zIndex: 10 }}
          />
          </Dialog.Trigger>
          <Dialog.Content>
          <div className="flex items-center justify-center w-full flex-col">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploadedFile ? (
                    <img
                      src={URL.createObjectURL(uploadedFile)}
                      alt="Profile Picture"
                      className="w-24 h-24 rounded-full mb-4"
                    />
                  ) : (
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  )}
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, or JPG (MAX. 800x400px)</p>
                </div>
              <input 
                id="dropzone-file" 
                type="file" 
                className="hidden" 
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={(e) => {setUploadedFile(e.target.files?.[0] || null); console.log(e.target.files?.[0])}}
              />
            </label>
            <Flex
            className="mt-5 w-full"
            justify={"end"}
            gap={"3"}
            >
              <Dialog.Close>
                <Button color="red" variant="surface" onClick={() => setUploadedFile(null)}>Cancelar</Button>
              </Dialog.Close>
              <Button color="green" variant="surface" onClick={handleImageUpload}>Guardar</Button>
            </Flex>
          </div> 
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "230px", width: "80%"}} className="relative z-0">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="mb-16 ml-4">
            <p style={{ fontSize: "34px", fontWeight: "bold", textAlign: "center", marginLeft: "150px"}}>{userData.name}</p>
            <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "150px", fontWeight: "lighter"}}>{userData.username}</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "30px", fontWeight:"initial" }}>Prioridad: {userData.priority}</p>
        </div>
      </div>

      <div className="flex justify-center mb-10 w-full">
        <div className="bg-[#16191C] text-white p-6 rounded-lg mx-4 w-[45%]" style={{ textAlign: "center" }}>
          <h3 className="text-3xl font-bold mb-4">Próxima Reservación</h3>
          {reservationData ? (
            <div className="flex items-center justify-center">
              <img
                src={getImage(reservationData.SpaceId)}
                alt="Próxima Reservación"
                className="w-80 h-80 mr-4 rounded-lg"
                style={{ objectFit: "cover" }}
              />
              <div className="flex flex-col gap-4 text-center">
                <Rectangle
                  iconSrc="/calendar.png"
                  title={formatDate(reservationData.Day)}
                  description={`${reservationData.StartHour} - ${reservationData.EndHour}`}
                />
                <div className="bg-[#2A3038] flex rounded-lg overflow-hidden p-4" style={{ width:"400px", height: "225px" }}>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white">Instrucciones Especiales</h4>
                    <p className="text-lg mt-2">{instructions.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No hay reservaciones próximas</p>
          )}
        </div>

        <div className="bg-[#16191C] text-white p-6 rounded-lg mx-4" style={{ textAlign: "center" }}>
          <h3 className="text-3xl font-bold mb-4">Estadísticas</h3>
          <div className="mt-4 flex flex-col gap-6">
            <Rectangle iconSrc="/calendar.png" title="Reservaciones" description={userStats?.Reservations?.toString() || "0"} />
            <Rectangle iconSrc="/clock.png" title="Horas de Aprendizaje" description={userStats?.StudyHours?.toString() || "0"} />
            <Rectangle iconSrc="/location.png" title="Áreas Descubiertas" description={`${userStats?.ExploredAreas || 0}/14`} />
          </div>
        </div>
      </div>
    </div>
  );
}
