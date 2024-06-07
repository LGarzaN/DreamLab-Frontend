"use client"
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import { ClipLoader } from "react-spinners";
import { Button, TextFieldInput, TextFieldRoot, TextFieldSlot } from "@radix-ui/themes";
import Link from "next/link";
import Lottie from "lottie-react";
import BotAnim from "./BotAnim.json"
import Secuencia from "./Secuencia"
import Navbar from "../components/Navbar";
import { getData } from "../utils/getrole";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import ReactMarkdown from "react-markdown";


export default function Home() {
  const [npcText, setNpcText] = useState("¿Hola!, ¿Cómo te puedo ayudar?")
  const [playerText, setPlayerText] = useState("")
  const [loading, setLoading] = useState(true)
  const [room, setRoom] = useState("recep")
  const [thread, setThread] = useState(null)
  const [interactions, setInteractions] = useState(0)

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  useEffect(() => {
    const getThread = async () => {
      try {
        const user = await getData()
        const response = await axios.post("/api/chat", {thread_id: null, message: `Hola soy ${user.name} y mi UserId es ${user.userId}`})
        setLoading(false)
        setThread(response.data.response.thread_id)
      } catch (e) {
        console.log(e)
      }
    }
    if (thread === null) {
      getThread()
    } else {
      setLoading(false)
    }
  }, [])

  const handleSend = async () => {
    setLoading(true)
    try {
      console.log("Sending message")
      const response = await axios.post("/api/chat", {
        thread_id: thread,
        message: playerText
      })
      console.log("NPC response", response.data.response)
      setPlayerText("")
      setInteractions(interactions + 1)
      setNpcText(response.data.response.response)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#121417] h-screen flex flex-col overflow-hidden relative">
      <Navbar />
      {room !== "" && <img alt="" src={`/${room}.png`} className="w-full h-full object-cover z-0 absolute inset-0"/>}
        <div className="w-full h-[85%] relative">
          <div className="h-[40%] w-full flex items-center justify-center gap-32 z-10">
            <motion.div 
              className="bg-[#121417] mt-24 border-[#42454A] border-2 h-[175px] w-[225px] rounded-[30px] flex justify-center px-5 items-center z-10"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1, delay: 3}}>
                {playerText}
              </motion.div>
              <motion.div 
              className="bg-[#121417] mt-24 border-[#42454A] border-2 min-h-[175px] max-h-[250px] min-w-[300px] max-w-[450px] rounded-[30px] flex justify-center px-5 py-4 items-center overflow-y-auto z-10"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1, delay: 3}}>
              <ScrollArea.Root>
                <ScrollArea.Viewport>
                  {!loading ? <ReactMarkdown>{npcText}</ReactMarkdown>: null}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical">
                  <ScrollArea.Thumb className="w-4 border-gray-700 border-2 rounded" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
              </motion.div>
          </div>
          <div className="h-[60%] w-full flex items-end justify-center gap-24 z-10">
            <motion.div 
            className="h-[80%] w-[40%] rounded-full p-6 mb-6"
            initial={{x: '-60vw'}}
            animate={{x: 0}}
            transition={{duration: 2}}>
              <Secuencia />
            </motion.div>
            <motion.div 
            className="h-[100%] w-[30%] rounded-full p-6 mb-6"
            initial={{x: '60vw'}}
            animate={{x: 0}}
            transition={{duration: 2, delay: 1}}>
              <Lottie animationData={BotAnim} />
            </motion.div>
          </div>
        </div>
        <div className="w-full h-[15%] flex justify-center items-center bg-[#121417] bg-opacity-75 z-10">
          <div className="w-full h-full flex justify-center items-center z-10">
            <TextFieldRoot radius="full" size={"3"} style={{ display: 'flex', alignItems: 'center', width: '30vw', height: '7vh'}}>
              <TextFieldInput 
                placeholder="Escribe tu mensaje"
                className=" bg-opacity-0 text-white"
                radius="full"
                value={playerText}
                onChange={(e) => setPlayerText(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{ marginRight: 'auto' }} // Align text field to the leftmost part
              />
              <button 
                type="submit"  
                className="z-10 hover:bg-opacity-60 transition-all bg-[#726FF5] rounded-full w-[8vw] h-[7vh] ml-auto text-xl flex items-center justify-center" 
                onClick={handleSend}
              >
                {loading ? <ClipLoader size={20} color="white"/>: "Enviar"}
              </button>
            </TextFieldRoot>
            <div>
              {interactions > 3 && 
                <Link href="/" className="text-neutral-400 ml-10 hover:text-white underline">
                  Reservar manualmente
                </Link>
              }
            </div>
          </div>
        </div>
    </div>
  );
}


// rounded-full w-full px-3 h-full bg-[#726FF5] hover:bg-opacity-40 text-white text-lg flex items-center justify-center transition-all