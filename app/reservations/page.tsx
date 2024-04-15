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
    <div className="h-screen">
      {page == 0 ? HourChooser(inicio, SetInicio) : null}
      <div className="w-full justify-center ">
        <Separator size="4"/>
          <section className="flex justify-around mt-10 w-full">
            <div>
              <h1 className="font-bold"> Inicia: {inicio}  </h1>
            </div>
            <div>
                  <h1 className="font-bold"> Termina: </h1> 
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