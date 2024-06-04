"use client"
import React, { useRef, useState, useEffect } from "react";
import downloadExcelFile from "../helper/downloadExcel";
import axios from "axios";

interface Reservation {
  Day: string;
  StartHour: string;
  EndHour: string;
  SpaceName: string;
  SpaceId: number;
  GroupCode: string;
  Name: string;
  Matricula: string;
  UserId: number;
  Fecha: string;
  'Eliminado': boolean;
}

export default function Excel() {
  const [data, setData] = useState<Reservation[]>([]);
  const [exportData, setExportData] = useState<Reservation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Reservation[]>('/api/adminreservations/excel')
      .then((response) => {
        setData(response.data);
        setExportData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleExport = () => {
    downloadExcelFile(exportData);
  };
  if (loading) {
    return <h1>Cargando...</h1>; 
  }
  return (
    <div className="">
      <div className="">
        <button
          className="bg-slate-600 py-[10px] rounded-lg px-8 text-white uppercase"
          onClick={handleExport}
        >
          Exportar
        </button>
      </div>
    </div>
  );
}
