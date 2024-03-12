"use client"
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [npcText, setNpcText] = useState("¿Hola!, ¿Cómo te puedo ayudar?")
  const [playerText, setPlayerText] = useState("")
  const [loading, setLoading] = useState(false)
  const [room, setRoom] = useState("bg")
  const [id, setId] = useState("1")

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  const handleSend = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/chat", {
        playerText: playerText,
        id: id
      })
      const room = checkForRoom(response.data.npcText.response)
      if (room) {
        setRoom(room)
        response.data.npcText.response = response.data.npcText.response.split("$$")[2]
        console.log(response.data.npcText.response)
      }
      setPlayerText("")
      setNpcText(response.data.npcText.response)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  

  const checkForRoom = (text: string) => {
    if (text && text.includes("$$")) {
      const char = text.split("$$")[1]
      return char
    }
  }

  return (
    <div className="bg-[#121417] h-screen flex flex-col overflow-hidden relative">
      <head>
        <title>DREAM Lab</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      {room !== "" && <img src={`/${room}.png`} className="w-full h-full object-cover z-0 absolute inset-0"/>}
        <div className="w-full h-[88%] relative">
          <div className="h-[40%] w-full flex items-center justify-center gap-32 z-10">
            <motion.div 
              className="bg-white h-[175px] w-[225px] rounded-[30px] flex justify-center px-5 items-center z-10"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1, delay: 3}}>
                {playerText}
              </motion.div>
              <motion.div 
              className="bg-white h-[175px] w-[300px] rounded-[30px] flex justify-center px-5 py-4 items-center overflow-y-auto z-10"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1, delay: 3}}>
                {!loading ? <TypeAnimation sequence={[npcText]} speed={75}></TypeAnimation>: <ClipLoader />}
              </motion.div>
          </div>
          <div className="h-[60%] w-full flex items-end justify-center gap-24 z-10">
            <motion.div 
            className="h-[95%] w-[30%] rounded-full p-6 mb-6"
            initial={{x: '-60vw'}}
            animate={{x: 0}}
            transition={{duration: 2}}>
              <img src="/character.png" className="w-[350px]"/>
            </motion.div>
            <motion.div 
            className="h-[95%] w-[30%] rounded-full p-6 mb-6"
            initial={{x: '60vw'}}
            animate={{x: 0}}
            transition={{duration: 2, delay: 1}}>
              <img src="/guide.png" className="w-[370px]"/>
            </motion.div>
          </div>
        </div>
        <div className="w-full h-[12%] flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="w-full h-full flex justify-center items-center z-10">
            <input type="text" className="rounded-md h-[30%] w-7 px-0.5 mr-2 bg-white" onChange={(e) => {setId(e.target.value)}}/>
            <div className="h-[30%] rounded-lg bg-white">
              <input type="text" 
              className="rounded-l-lg h-full" 
              value={playerText} 
              onChange={(e) => {setPlayerText(e.target.value)}}
              onKeyDown={handleKeyPress}/>
                <button 
                className="h-full px-3 bg-white rounded-r-lg hover:bg-gray-300 font-bold transition-all" 
                onClick={() => {handleSend()}}
                disabled={loading}>Send</button>
            </div>
          </div>
        </div>
    </div>
  );
}
