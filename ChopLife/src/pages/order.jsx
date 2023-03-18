import Sidebar from "../comps/sidebar"
import MsgBubble from "../comps/msgBubble";
import { useState, useEffect } from "react";
import moment from "moment";
import emitEvent from "../comps/utils";


export default function Order() {

    const [ans, setAns] = useState([]);
    const [input, setInput] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let data;
        if (input === '') return;
        let  eventType = emitEvent(input);

            data = {
                eventName: eventType,
                namE: `${Math.random() * 100}`,
                timE:  `${moment().toLocaleString().split(' ')[4]}`,
                bodY: input,
                statuS: "sent"
            }
            setAns((ans) => [...ans, data]);
            socket.emit(eventType, data);
            setInput('');
        }
       
  

    useEffect(() => {

        socket.on('welcome', (data) => {
            setAns([...ans, data])
        });

        socket.on('menu', (data) => {
            setAns((ans) => [...ans, data])
        });

        socket.on('current_order', (data) => {
            setAns((ans) => [...ans, data])
        });

        socket.on('total', (data) => {
            setAns((ans) => [...ans, data])
        });

        socket.on('checkout', (data) => {
            setAns((ans) => [...ans, data])
        });

        socket.on('order_cancelled', (data) => {
            setAns((ans) => [...ans, data])
        });

        socket.on('history', (data) => {
            setAns((ans) => [...ans, data])
        });
        
        // Remove the event listener when the component is unmounted
        return () => {
          socket.off('welcome');
          socket.off('menu');
          socket.off('current_order');
          socket.off('total');
          socket.off('order_cancelled');
          socket.off('history');
        }
      }, []);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <div className="flex justify-between w-screen">
            <main className="flex  w-3/4 max-h-screen p-5">
                <div className="w-full flex flex-col justify-between">
                    <MsgBubble messages={ans} />
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row items-center bg-slate-400 h-16 rounded-xl border-2  w-full px-5">
                            <div className="ml-4 w-full">
                                <div className="relative w-full ">
                                    <input type="text" onChange={handleInputChange} value={input} className="flex  border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 w-full"/>
                                </div>
                            </div>
                            <div className="ml-4">
                                <button  type="submit" className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                    <span>Send</span>
                                    <span className="ml-2">
                                    <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                    </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
              
            </main>
            <Sidebar/>
        </div>
    )
}