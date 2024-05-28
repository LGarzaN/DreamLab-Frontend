'use client'
import React, { useState, useRef } from 'react';
import { Text, TextFieldInput } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import PatternLock from './patternLock';

export default function PatternLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [pattern, setPattern] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (username: string, pattern: string) => {
        setLoading(true);

        if (!username || !pattern) {
            toast.error("Por favor llena todos los campos", { style: { backgroundColor: "#121417", color: "white" } });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/login/pattern', {
                username: username,
                pattern_password: pattern
            });

            if (response.status === 200) {
                setLoading(false);
                router.push('/');
            } else {
                toast.error("Usuario y/o patrón incorrectos", { style: { backgroundColor: "#121417", color: "white" } });
                setLoading(false);
            }
        } catch (error) {
            toast.error(`Error: ${error}`, { style: { backgroundColor: "#121417", color: "white" } });
            setLoading(false);
        }
    };

    const handlePatternComplete = async (pattern: string) => {
        setPattern(pattern);
        const form = formRef.current;
        if (form) {
            const formData = new FormData(form);
            const username = formData.get('username') as string;
            await handleSubmit(username, pattern);
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="bg-[#121417] h-screen flex justify-center items-center relative">
            <img alt="" src="/bg6.png" className="w-full h-full object-cover z-0 absolute inset-0 opacity-80" />
            <div className="bg-neutral-900 bg-opacity-0 w-full md:w-9/12 h-screen md:h-[90vh] flex items-center justify-center z-10 md:bg-opacity-85 rounded-lg">
                <div className="w-7/12 h-full bg-[#2F353D] bg-opacity-35 hidden justify-center items-center flex-col rounded-l-lg md:flex">
                    <Text className="text-5xl font-bold text-white">D.R.E.A.M. Lab</Text>
                    <Text className="text-2xl text-white">Aprende, descubre, e inova</Text>
                    <img alt="" src="/loginimg.png" className="w-8/12 h-8/12 mt-10" />
                </div>
                <div className="w-full md:w-5/12 h-full flex justify-center items-center flex-col">
                    <Text className="text-5xl md:text-4xl font-semibold text-white">Inicia sesión</Text>
                    <Text className="text-2xl md:text-xl text-white">Con tu cuenta del TEC</Text>
                    <div className="mt-16 w-3/4">
                        <form ref={formRef} onSubmit={handleFormSubmit}>
                            <div>
                                <span className="text-white">Matrícula</span>
                                <TextFieldInput name="username" placeholder="Ej. A01721881" className="w-full rounded-md bg-[#111215] text-white border-gray-600 border-[0.1px]" size={"3"} />
                            </div>
                            <div className="mt-8">
                                <PatternLock onPatternComplete={handlePatternComplete} />
                            </div>
                            <div className="w-full flex justify-center mt-10">
                                <button type="submit" className="w-11/12 md:w-8/12 h-12 rounded-full bg-[#726FF5] hover:bg-opacity-75 hover:text-neutral-300 text-white text-lg flex items-center justify-center transition-all  ">
                                    {loading ? <ClipLoader size={20} color="white" /> : "Iniciar sesión"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
