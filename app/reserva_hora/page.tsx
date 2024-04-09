"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

function ReservaHora() {
  const sp = useSearchParams();
  const search = sp.get("nombre");
  return (
    <div>
      <h1>Variable pasada: {search} </h1>
    </div>
  );
}

export default ReservaHora;
