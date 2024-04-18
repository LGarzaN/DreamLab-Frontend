import React from "react";

function RequirementsChooser(date: string, start: number, end: number) {
  return (
    <div className="h-[40vh] mt-20">
      <div className="flex flex-col lg:flex-row items-center lg:justify-start lg:items-start">
        <div className="text-center lg:pl-16 lg:w-[35vw] lg:text-start">
          <p className="text-white text-3xl md:text-4xl lg:text-[50px] font-light tracking-wide leading-loose">
            {date}
          </p>
          <p className="text-white text-3xl md:text-4xl lg:text-[50px] font-bold tracking-wide mt-8">
            {start}:00 a {end}:00
          </p>
        </div>

        <div>
          {/*requerimientos*/}
          <div className="bg-white-500 h-28 w-80 lg:w-[40vw] bg-[#16191C] lg:ml-40 rounded-xl flex items-center	">
            <img
              src="/requirements/persons.png"
              alt="numero de peronas"
              className=" w-20 ml-10"
            />

            <h1 className="lg:ml-4 text-2xl ">Número de personas</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequirementsChooser;
