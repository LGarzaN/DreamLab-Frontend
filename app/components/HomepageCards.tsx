"use client";
import React from "react";
import Image from "next/image";
import { Dialog, TextField, Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { data } from "@/data/areas_data";

function HomepageCards({
  keyword,
  specificArea,
}: {
  keyword: string;
  specificArea: string;
}) {
  const filteredData = data.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(keyword.toLowerCase());
    const areaMatch =
      specificArea.trim() === "" ||
      item.area.toLowerCase() === specificArea.toLowerCase();

    if (keyword.trim() === "") {
      return areaMatch;
    } else {
      return nameMatch && areaMatch;
    }
  });

  return (
    <div className="flex justify-center min-h-[80vh]">
      <div className="md:w-[66vw] w-[84vw] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {filteredData.map((item) => (
          <Dialog.Root key={item.id}>
            <Dialog.Trigger>
              <div key={item.id} className="m-2">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="rounded-lg object-cover h-28 w-36 lg:h-40 lg:w-[15vw] hover:brightness-50 transition ease-in-out delay-100 "
                />
                <div className="text-sm lg:text-xl font-semibold tracking-wide ">
                  {item.name}
                </div>
                <div className="text-xs lg:text-base font-light tracking-wide text-slate-400">
                  {item.area}
                </div>
              </div>
            </Dialog.Trigger>

            <Dialog.Content>
              <div className="flex items-center">
                <Image
                  src={item.image}
                  alt={item.alt}
                  height={200}
                  width={200}
                  className="rounded-lg object-cover h-28 w-36 lg:h-40 lg:w-52 hover:brightness-50 transition ease-in-out delay-100"
                />
                <div className=" grid justify-items-stretch ml-4">
                  <div className="text-3xl font-bold">{item.name}</div>
                  <div>{item.descripcion}</div>
                  <div className="justify-self-center mt-4	">
                    <Dialog.Close>
                      <Link
                        href={{
                          pathname: "/reserva_hora",
                          query: {
                            name: item.name,
                            id: item.id
                          },
                        }}
                      >
                        <Button variant="soft" color="violet">
                          Reservar ahora
                        </Button>
                      </Link>
                    </Dialog.Close>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        ))}
      </div>
    </div>
  );
}

export default HomepageCards;
