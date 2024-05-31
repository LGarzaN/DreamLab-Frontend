"use client";
import React from "react";
import Image from "next/image";
import { Dialog, TextField, Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { data } from "@/data/areas_data";
import { useEffect, useState } from "react";


function HomepageCards({
  keyword,
  specificArea,
  path
}: {
  keyword: string;
  specificArea: string;
  path: string;
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
              <div key={item.id} className="m-2 mb-3">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="rounded-lg object-cover h-28 w-36 lg:h-40 lg:w-[15vw] hover:brightness-50 transition ease-in-out "
                />
                <div className="text-sm lg:text-xl font-semibold tracking-wide mt-1.5">
                  {item.name}
                </div>
                <div className="text-xs lg:text-base font-light tracking-wide text-slate-400">
                  {item.area}
                </div>
              </div>
            </Dialog.Trigger>

            <Dialog.Content size={"4"}>
              <div className="flex items-center">
                <Image
                  src={item.image}
                  alt={item.alt}
                  height={200}
                  width={200}
                  className="rounded-lg object-cover h-28 w-36 lg:h-40 lg:w-52 hover:brightness-50 transition ease-in-out"
                />
                <div className=" grid justify-items-stretch ml-4">
                  <div className="text-3xl font-bold mb-4">{item.name}</div>
                  <div>{item.descripcion}</div>
                  <div className="justify-end gap-4 flex mt-4">
                    <Dialog.Close className="">
                      <Button
                        variant="soft"
                        color="gray"
                        className="hover:cursor-pointer"
                      >
                        Cerrar
                      </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                      <div>
                        <Link
                          href={{
                            pathname: path,
                            query: {
                              id: item.id,
                            },
                          }}
                        >
                          <Button
                            variant="soft"
                            color="violet"
                            className="hover:cursor-pointer"
                          >
                            Reservar ahora
                          </Button>
                        </Link>
                      </div>
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
