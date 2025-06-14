import { Link, Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Details from "./Components/Details";

function App() {
  const {search, pathname}=useLocation();
  console.log(search,pathname);
  return (
    <>
      <div  className="w-screen h-screen flex">
        {(pathname !="/" || search.length>0)&&
         <Link  to="/" className=" absolute text-red-300 left-[20%] top-[3%]">Home</Link>
         }
       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
