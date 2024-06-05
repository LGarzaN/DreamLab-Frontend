"use client"
import React, { useRef, useState, useEffect } from "react";
import downloadExcelFile from "@/app/helper/downloadExcel";
import axios from "axios";
import { Button } from "@radix-ui/themes";

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
    <Button onClick={handleExport} size={"3"} color="gray" variant="outline">
      Exportar a Excel
    </Button>
  );
}
