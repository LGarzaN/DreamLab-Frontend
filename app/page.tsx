"use client";
import React, { useState } from "react";
import HomepageCards from "./components/HomepageCards";
import { Tabs, Box, Text } from "@radix-ui/themes";

function page() {
  const [name, setName] = useState("");
  return (
    <div className=''>
      <div className="flex justify-center ">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder= "Busca un area"
          className="flex justify-center w-2/5 p-2.5 rounded-lg text-sm bg-[#293038]  "
          //className="bg-[#293038] border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className=''> 
        <Tabs.Root defaultValue="todos">
          <div className="flex justify-center text-xl ">
            <Tabs.List className="w-full lg:w-[65.4%] flex justify-center">
              <Tabs.Trigger value="todos"> <Text size={{initial:"1", lg:"3"}}>Todos</Text> </Tabs.Trigger>
              <Tabs.Trigger value="espacio_abierto"> <Text size={{initial:"1", lg:"3"}}>Espacios Abiertos</Text> </Tabs.Trigger>
              <Tabs.Trigger value="garage_valley"> <Text size={{initial:"1", lg:"3"}}>Garage Valley</Text> </Tabs.Trigger>
              <Tabs.Trigger value="zona_xploracion"> <Text size={{initial:"1", lg:"3"}}>Zona de Xploracion</Text> </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Box pt="3">
            <Tabs.Content value="todos">
              <HomepageCards keyword={name} specificArea="" />
            </Tabs.Content>

            <Tabs.Content value="espacio_abierto">
              <HomepageCards keyword={name} specificArea="Espacios Abiertos" />
            </Tabs.Content>

            <Tabs.Content value="garage_valley">
              <Text size="2">
                <HomepageCards keyword={name} specificArea="Garage Valley" />
              </Text>
            </Tabs.Content>

            <Tabs.Content value="zona_xploracion">
              <HomepageCards keyword={name} specificArea="Zona de X-Ploración" />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default page;
