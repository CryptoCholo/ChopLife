import Member from "./options"
import { useState, useEffect } from "react"

export default function Sidebar() {
  const [time, setTime] = useState('60')

  socket.on('time', (event) => {
    setTime(event.message)
  })
  
    return (
        <div className="flex flex-col justify-between p-5 w-1/4 h-screen border-l-2 border-slate-700">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">OPTIONS</span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full">
            <Member abbr="P" name="PLACE ORDER" bg="bg-indigo-200" score="1"/>
            <Member abbr="C" name="CHECKOUT ORDER" bg="bg-indigo-500" score="99"/>
            <Member abbr="O" name="ORDER HISTORY" bg="bg-indigo-200" score="98"/>
            <Member abbr="C" name="CURRENT ORDER" bg="bg-indigo-500" score="97"/>
            <Member abbr="C" name="CANCEL ORDER" bg="bg-indigo-200" score="0"/>
           
          </div>
          <div className="text-4xl font-extrabold flex justify-center">
             {`0:00:${time}`}
          </div>
        </div>
    )
}

     {/* <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                M
              </div>
              <div className="ml-2 text-sm font-semibold"></div>
              <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                2
              </div>
            </button> */}