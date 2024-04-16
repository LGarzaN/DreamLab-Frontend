"use client"
import { useState } from "react"
import HourChooser from "./hour"
import { Separator } from "@radix-ui/themes"

export default function Page() {
  const [page, setPage] = useState(0)
  const [inicio, SetInicio] = useState("")

  const handleClick = () => {

  }


  return (
    <div className="">
      {page == 0 ? HourChooser(inicio, SetInicio) : null}
      <div className="w-full justify-center ">
        <Separator size="4"/>
          <section className="flex justify-around mt-10 w-full mb-10">
            <div className="w-60 flex flex-col justify-center items-center">
              <h1 className="font-bold pb-2"> Inicia: </h1>
              <div className="w-60 h-12 border-2	border-white rounded-full flex justify-center items-center">{inicio} hrs</div>
            </div>
            <div className="w-60 flex flex-col justify-center items-center">
              <h1 className="font-bold pb-2"> Termina: </h1>
              <div className="w-60 h-12 border-2	border-white rounded-full flex justify-center items-center">{inicio} hrs</div>
            </div>

                <div>
                  <button onClick={() => setPage(page + 1)}>
                    Continuar
                  </button>
                </div>


              </section>
            </div>
    </div>
  )
}