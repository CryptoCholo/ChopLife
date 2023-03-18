import { Link } from "react-router-dom";


function Home() {
    const emitMenu = (event) => {
      socket.emit('showmenu', {});
    }
   
  return (
    <div className="App">
       <div className=" h-screen w-screen flex flex-col items-center justify-around">
        <div className="text-6xl font-extrabold">
            CHOPLIFE RESTAURANT 
            
        </div>
        <div className=" flex gap-12 text-2xl">
            <Link to="/order"> 
                <button className="py-5 px-10 font-bold bg-slate-300" onClick={emitMenu}>
                     Menu
                </button>
            </Link>
        </div>
    </div>
    </div>
  )
}

export default Home
