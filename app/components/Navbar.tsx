"use client"

import Link from "next/link";
import React, {useState, useEffect} from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { isAdmin } from "../utils/getrole";
import Cookies from "js-cookie";


const Navbar = () => {
    const [show, setShow] = useState(false);
    const dragX = useMotionValue(0);
    const dragThreshold = -500; // Adjust this value based on your preference
    const [profilePath, setProfilePath] = useState("/profile");
    const [reservationsPath, setReservationsPath] = useState("/view-reservations");
    const [profilePicture, setProfilePicture] = useState("/userdefault.svg");
    const [hasFetchedProfilePicture, setHasFetchedProfilePicture] = useState(false);

    const opacity = useTransform(
        dragX,
        [dragThreshold, 0],
        [0, 1],
        { clamp: false }
    );

    const handleDragEnd = () => {
        if (dragX.get() <= dragThreshold) {
            setShow(false); 
        }
    };

    const logout = async () => {
        const res = await axios.post('/api/logout', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            window.location.reload();
        } else {
            toast.error("Error al cerrar sesion");
        }
    }
    useEffect(() => {
        async function ad(){
          return await isAdmin()
        }
        ad().then(resultado => {
          if (resultado === true) {
            setProfilePath("/admin-profile");
            setReservationsPath("/admin-view-reservations");
          }
        });

        const fetchProfilePicture = async () => {
            if (Cookies.get('profilePicture')) {
              setProfilePicture(Cookies.get('profilePicture')!);
              setHasFetchedProfilePicture(true);
              return;
            }
            try {
                console.log("Fetching profile picture");
              const response = await axios.get('/api/profile-picture');
              if (response.status === 200) {
                const data = response.data;
                if (typeof data === 'string') {
                  const url = decodeURIComponent(data);
                  Cookies.set('profilePicture', url);
                  setProfilePicture(url);
                  setHasFetchedProfilePicture(true);
                } else {
                  throw new Error('Invalid data format');
                }
              } else {
                throw new Error('Failed to fetch profile picture');
              }
            } catch (error) {
              console.error(error);
            }
          };
      
          if (!hasFetchedProfilePicture) {
            fetchProfilePicture();
          }
          
      }, [hasFetchedProfilePicture]);

    return (
        <>
            <div className="bg-[#121417] z-20 absolute top-0 w-full h-[65px] bg-opacity-0">
                <div className="hidden md:flex items-center px-10 h-full">
                    <div className="flex flex-row items-center gap-3">
                        <Link href={"/"} className="flex flex-row items-center gap-3">
                            <Image src="/navlogo.svg" alt="logo" className="h-[37px] w-[37px]" width={37} height={37}/>
                            <h1 className="font-black text-lg italic">D.R.E.A.M.</h1>
                        </Link>
                    </div>
                    <div className="ml-12">
                        <ul className="flex flex-row gap-8 text-gray-400">
                            <li className="hover:text-[#abaaff] transition-all"><Link href={reservationsPath}>Reservaciones</Link></li>
                            <li className="hover:text-[#abaaff] transition-all"><Link href={"/info"}>Información</Link></li>
                        </ul>
                    </div>
                    <div className="ml-auto flex flex-row gap-4">
                        <button className="text-gray-300" onClick={async () => {await logout()}}>Cerrar Sesión</button>
                        <Link href={profilePath}>
                            <Image src={profilePicture} className="w-[50px] rounded-full" alt="ProfilePicture" width={45} height={45}/>
                        </Link>
                    </div>
                </div>
                <div className="flex md:hidden h-full items-center px-5">
                    <button onClick={()=> setShow(true)}>
                        {!show && <Image alt="Menu" src="/hamburger.svg" className="w-[40px]" width={40} height={40}/>}
                    </button> 
                </div>
            </div>
            <AnimatePresence>
                {show && (
                <motion.div 
                className="w-4/6 absolute top-0 h-[100vh] bg-[#121417] z-30 bg-opacity-95"
                initial={{x: -400}}
                animate={{x: 0}}
                exit={{x: -400}}
                transition={{type: "tween", stiffness: 1000}}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                dragMomentum={false}
                dragTransition={{ power: 0 }}
                style={{ opacity }}
                onDrag={handleDragEnd}>
                    <div className="flex flex-row items-center pl-5 w-full h-[22%]">
                        <Image alt="ProfilePicture" src="/userdefault.svg" className="w-[65px] mr-5" width={65} height={65}/>
                        <div className="flex flex-col">
                            <h1 className="text-white text-sm">Juan Perez</h1>
                            <p className="text-neutral-400 text-sm">Matricula</p>
                        </div>
                    </div>
                    <div className="flex w-full h-[63%] px-5">
                        <ul className="flex flex-col gap-8 w-full text-lg">
                            <li className="hover:text-[#abaaff] transition-all"><Link href={"/"}>Inicio</Link></li>
                            <li className="hover:text-[#abaaff] transition-all"><Link href={"/view-reservations"}>Reservaciones</Link></li>
                            <li className="hover:text-[#abaaff] transition-all"><Link href={"/info"}>Información</Link></li>
                            <li className="hover:text-[#abaaff] transition-all"><button onClick={async () => {await logout()}}>Cerrar Sesión</button></li>
                        </ul>
                    </div>
                    <div className="w-full flex justify-center h-[15%] items-center">
                        <button className="w-9/12 h-10 bg-[#293038] rounded-xl" onClick={()=> setShow(false)}>
                            Cerrar
                        </button>   
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar;