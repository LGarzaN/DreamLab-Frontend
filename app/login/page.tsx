"use client"

import { Text, TextFieldInput } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import Image from "next/image"; 
import Lottie from "lottie-react";
import Scan from "./Scan.json"
import { motion } from "framer-motion";

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const blurStyle = showPopup ? "blur-md" : "";

    const togglePopup = async () => {
        setShowPopup(!showPopup);
        console.log("Popup toggled:", !showPopup);
    
        if (!showPopup) {
            try {
                const response = await axios.get('https://dlbackendtws.azurewebsites.net/login/id');
                console.log(response.data); // Optional: Handle the response
            } catch (error) {
                console.error('Error:', error); // Optional: Handle errors
            }
        }
    };
    

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
     
        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')

        if (!username || !password) {
            toast.error("Por favor llena todos los campos", {style: {backgroundColor: "#121417", color: "white"}})
            setLoading(false)
            return
        }
        
        try {
            const response = await axios.post('/api/login', {
                username: username,
                password: password
            })
            
            if (response.status === 200) {
                setLoading(false)
                router.push('/')
            } else {
                toast.error("Usario y/o contrasena incorrectos", {style: {backgroundColor: "#121417", color: "white"}})
                setLoading(false)
            }
        } catch (error) {
            toast.error(`Error: ${error}`, {style: {backgroundColor: "#121417", color: "white"}})
            setLoading(false)
        }
      }

    return (
        <div className="bg-[#121417] h-screen flex justify-center items-center relative">
            <img alt="" src="/bg6.png" className="w-full h-full object-cover z-0 absolute inset-0 opacity-80"/>
            <div className="bg-neutral-900 bg-opacity-0 w-full md:w-9/12 h-screen md:h-[90vh] flex items-center justify-center z-10 md:bg-opacity-85 rounded-lg">
                <div className="w-7/12 h-full bg-[#2F353D] bg-opacity-35 hidden justify-center items-center flex-col rounded-l-lg md:flex">
                    <Text className="text-5xl font-bold text-white">D.R.E.A.M. Lab</Text>
                    <Text className="text-2xl text-white">Aprende, descubre, e inova</Text>
                    <img alt="" src="/loginimg.png" className="w-8/12 h-8/12 mt-10" />
                </div>
                <div className="w-full md:w-5/12 h-full flex justify-center items-center flex-col">
                    <Text className="text-5xl md:text-4xl font-semiboldtext-white">Inicia sesión</Text>
                    <Text className="text-2xl md:text-xl text-white">Con tu cuenta del TEC</Text>
                    <div className="mt-16 w-3/4">
                        <form onSubmit={handleSubmit}>
                        <div>
                            <span className="text-white">Matricula</span>
                            <TextFieldInput name="username" placeholder="Ej. A01721881" className="w-full rounded-md bg-[#111215] text-white border-gray-600 border-[0.1px]" size={"3"}/>
                        </div>
                        <div className="mt-4">
                            <span className="text-white">Contraseña</span>
                            <TextFieldInput name="password" placeholder="Contraseña" type="password" className="w-full rounded-md bg-[#111215] text-white border-gray-600 border-[0.1px]" size={"3"}/>
                        </div>
                        <div className="w-full flex justify-center mt-10">
                            <button type="submit" className="w-11/12 md:w-8/12 h-12 rounded-full bg-[#726FF5] hover:bg-opacity-75 hover:text-neutral-300 text-white text-lg flex items-center justify-center transition-all  ">{loading ? <ClipLoader size={20} color="white"/>: "Iniciar sesión"}</button>
                        </div>
                        </form>
                    </div>
                    <button className="absolute bottom-5 right-5 w-20 h-16 rounded-full  hover:bg-opacity-75 text-white text-lg flex items-center justify-center transition-all"  color="white" onClick={() => {togglePopup(); console.log("Button clicked!")}}>
                            RFid
                            <img alt="" src="/scanId.png" className="w-12.1 h-12 object-cover" />
                    </button>
                </div>
                
            </div>
            {showPopup && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-[#1c2223] p-8 rounded-lg relative" style={{ width: '400px', height: '300px' }}>
                    <button onClick={togglePopup} className="absolute top-3 left-5 text-white-500 font-bold">X</button>
                    
                    <div className="h-full w-full flex items-center justify-center">
                        <motion.div 
                            className="rounded-full relative"
                            transition={{ duration: 2, delay: 1 }}
                            style={{ width: '400px', height: '400px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} 
                        >
                            <Lottie animationData={Scan} />
                        </motion.div>
                    </div>
                </div>
            </div>
        
            )}




        </div>
    )
}