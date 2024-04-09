"use client"

import Link from "next/link";
import React, {useState} from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const dragX = useMotionValue(0);
    const dragThreshold = -500; // Adjust this value based on your preference

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

    return (
        <>
            <div className="bg-[#121417] z-20 absolute top-0 w-full h-[65px] bg-opacity-0">
                <div className="hidden md:flex items-center px-10 h-full">
                    <div className="flex flex-row items-center gap-3">
                        <Link href={"/"} className="flex flex-row items-center gap-3">
                            <img src="/navlogo.svg" alt="logo" className="h-[37px] w-[37px]" />
                            <h1 className="font-black text-lg italic">D.R.E.A.M.</h1>
                        </Link>
                    </div>
                    <div className="ml-12">
                        <ul className="flex flex-row gap-8 text-gray-400">
                            <li className="hover:text-[#abaaff] transition-all"><Link href={"/reservations"}>Reservaciones</Link></li>
                            <li className="hover:text-[#abaaff] transition-all"><Link href={"/info"}>Informacion</Link></li>
                        </ul>
                    </div>
                    <div className="ml-auto">
                        <Link href={"/user"}>
                            <img src="/userdefault.svg" className="w-[45px]"></img>
                        </Link>
                    </div>
                </div>
                <div className="flex md:hidden h-full items-center px-5">
                    <button onClick={()=> setShow(true)}>
                        {!show && <img src="/hamburger.svg" className="w-[40px]"/>}
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
                        <img src="/userdefault.svg" className="w-[65px] mr-5"></img>
                        <div className="flex flex-col">
                            <h1 className="text-white text-sm">Juan Perez</h1>
                            <p className="text-neutral-400 text-sm">Matricula</p>
                        </div>
                    </div>
                    <div className="flex w-full h-[63%] px-5">
                        <ul className="flex flex-col gap-8 w-full text-lg">
                            <li className="hover:text-[#abaaff] transition-all"><Link href={"/"}>Inicio</Link></li>
                            <li className="hover:text-[#abaaff] transition-all"><Link href={"/reservations"}>Reservaciones</Link></li>
                            <li className="hover:text-[#abaaff] transition-all"><Link href={"/info"}>Informacion</Link></li>
                            <li className="hover:text-[#abaaff] transition-all"><Link href={"/info"}>Cerrar Sesion</Link></li>
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