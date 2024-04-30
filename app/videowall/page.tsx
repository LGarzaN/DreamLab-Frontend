"use client";
import React from "react";
import Videowall_bar from "../components/Videowall_bar";

function page() {
  return (
    <div className="h-[1080px] w-[3840px] bg-gradient-to-t from-[#010135] to-[#00001C] flex flex-row">
      <div className="w-[960px]"> Reservaciones </div>

      <div className="w-[1920px]">
        <div className="relative h-full w-full place-content-center">
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source
              src="https://picmeshbucket.s3.us-east-1.amazonaws.com/videowall.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCQKtrOwmqVIO9SyTB36UYG2YHpKlmmXAEtovzt1sOhtwIhAP8860YgJJWSHvdlAx3BGhh3ENrMTVFu9UJdC7szdAV%2BKuQCCB0QABoMODkxMzc3MDc4MTAwIgwzN%2BrO9vHAzv7bK8cqwQLph2omaYyTLUfs%2F%2FtnuRjz%2FHuAymEDU0Z9rR5QMrap%2F6B6aXw92ZAbooNUr7ixl9B3WY7Epbha2wT5gJFa7b%2F004QEdQKrbAtjDizAgrSiqYlJ2jZKvTs10LRK3W42JhMRLSsEGwbWA5KDTITa4gbA8kGqQmJK4v%2Btn5hu18nurd%2Bic%2BbDSRkKj93kBwP4DKzTmX0cAu05ViCloj4tMpR1qhZWRKtTjb%2BptgnRlX%2Ff%2F2kKlALa0VWrMamH59Nkeb29sGn9sn5GPN5eaUr8Ecfpf%2B2j7ETrDif%2BRHi4S7IFnWedFHWl%2FXkqWeYM8blZZfmyHrqO0pCQ7KjEXr5ZEwVTy5B9mZumtcBjHfC2DO5RDO7LZf2aVLqHi%2FGcw5IB03giQmOZ5wcqehccbYbNCUKOBm7J%2FJTYeYNnyxJQ96FIQ0Qwify%2FsQY6sgKNgMbHUcJSr0irotlcGmDcl17FnQRekDwaVLXAZygF1%2F348kGko41vPkRBQn90%2Ff3bg9d%2B1dckYgyww7Jyyn9Z%2FP2eB2EAHfnvoTy2dVhf9W0HvUVUxCnySI4e6RuhhcsrC2WBBq6n5SvDl7YXe2w6OEJUQ6Bt6KWSOQ95d7ySVb8ZG4GWcXMborIOPCPS3%2F5NYQINdQ6wazw4DMmY1tyTvHy2Yuf7DNJv1UlAK3IhSLZKInBQkb2p8Z%2FAr3uS5jSWh3yK%2BqO72awG%2FgbfBU7X%2B5b%2F%2BriADICeXvYc%2BFQS7FD%2F2q8XHDI1VjGrG2sta5teb7PwoqIcUm1S4l5uwFGMU4KJyjPUeM0ZPOiHLQ31U8pGtTby5N0eD3dbBXY0Yy5iI7oO8prgZJYznUuBj7uN6No%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240429T201425Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA47CRWZ5KGALE2JNN%2F20240429%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=87b660980a1165d1142ac9dc13c55d3185e8eb0ca860be7234c09814c7fdccfe"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 flex justify-center items-end mb-20">
            <Videowall_bar />
          </div>
        </div>
      </div>

      <div className="w-[960px]">h</div>
    </div>
  );
}

export default page;
