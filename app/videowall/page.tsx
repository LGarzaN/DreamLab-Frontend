"use client";
import React from "react";
import Videowall_bar from "../components/Videowall_bar";

function page() {
  return (
    <div className="h-[1080px] w-[3840px] bg-gradient-to-tr from-[#020C2F] via-[#294982] to-[#57BFD4] flex flex-row">
      <div className="w-[50vw] border"></div>

      <div className="w-[100vw] border">
        <div className="flex justify-center items-end h-[90vh]">
          <Videowall_bar/>
        </div>
      </div>

      <div className="w-[50vw] border"></div>
    </div>
  );
}

export default page;

{
  /*<div className='h-full w-[50vw] bg-[#020C2F]'>

        </div>

        <div className='h-full w-[100vw] bg-gradient-to-tr  from-1/5 from-[#020C2F] to-[#57BFD4]'>
            <div className='Fondo -- relative h-full w-full place-content-center flex flex-row'>
                <video autoPlay loop muted style={{ transform: 'scaleX(-1)' }}>
                    <source src="/videowall/background_video.mp4" type="video/mp4" />
                </video>
                <video autoPlay loop muted>
                    <source src="/videowall/background_video.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
  */
}
