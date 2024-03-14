"use client"

import { Text, TextFieldInput } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useState } from "react";
import Cookies from 'js-cookie'
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { v4 as uuidv4 } from 'uuid';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

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
     
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
     
        if (response.status === 200) {
            Cookies.set('id', uuidv4())
            router.push('/')
        } else {
            toast.error("Usario y/o contrasena incorrectos", {style: {backgroundColor: "#121417", color: "white"}})
            setLoading(false)
        }
      }

    return (
        <div className="bg-[#121417] h-screen flex justify-center items-center relative">
            <img src="/bg6.png" className="w-full h-full object-cover z-0 absolute inset-0 opacity-80" />
            <div className="bg-neutral-900 w-9/12 h-[90vh] flex items-center justify-center z-10 bg-opacity-85 rounded-lg">
                <div className="w-7/12 h-full bg-[#2F353D] bg-opacity-35 flex justify-center items-center flex-col rounded-l-lg">
                    <Text className="text-5xl font-bold text-white">D.R.E.A.M. Lab</Text>
                    <Text className="text-2xl text-white">Aprende, descubre, e inova</Text>
                    <img src="/loginimg.png" className="w-8/12 h-8/12 mt-10" />
                </div>
                <div className="w-5/12 h-full flex justify-center items-center flex-col">
                    <Text className="text-4xl font-semibold text-white">Inicia sesión</Text>
                    <Text className="text-xl text-white">Con tu cuenta del TEC</Text>
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
                            <button type="submit" className="w-10/12 h-12 rounded-full bg-[#726FF5] hover:bg-opacity-45 text-white text-lg flex items-center justify-center transition-all  ">{loading ? <ClipLoader size={20} color="white"/>: "Iniciar sesión"}</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}