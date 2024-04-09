"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function ReservaHora() {
  const sp = useSearchParams();
  const name = sp.get("name") || "Lego Room";
  const image_link = sp.get("image") || '/areas/lego_room.jpeg';

  return (
    <div>
        <div className="relative w-full">
            <Image
                src= {image_link}
                width={200}
                height={200}
                alt="Descripción"
                className="w-full h-[30vh] lg:h-[40vh] object-cover brightness-50"
                
            />
            <div className="absolute inset-0 flex items-center justify-center lg:justify-start m-16 text-2xl lg:text-6xl font-extrabold">
                <h1>{name}</h1>
            </div>
        </div>
        
    </div>
  );
}

export default ReservaHora;
