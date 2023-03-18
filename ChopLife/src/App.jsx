import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order from './pages/order';
import Home from "./pages/home";



function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
           <Route path="/order" element={<Order/>}/>
          </Routes>
        </BrowserRouter>
      );
}

export default App
