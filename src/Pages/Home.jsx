import React, { useState } from "react";
import Carousel from "../Components/Carousel";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import SearchBox from "../Components/SearchBox";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";

export default function Home() {
  const [loading , setLoading]=useState(false)
 const [images , setImages]= useState([
     '/default/p1.jpg', '/default/p2.jpg', '/default/p3.jpg', '/default/p4.png',
    '/default/p5.png', '/default/p6.png', '/default/p7.png', '/default/p8.png',
    '/default/p9.png', '/default/p10.png', '/default/p11.png', '/default/p12.png',
    '/default/p13.png', '/default/p14.png', '/default/p15.png', '/default/p16.png',
    '/default/p17.png', '/default/p18.png', '/default/p19.png', '/default/p20.png',
    '/default/p21.png', '/default/p22.png', '/default/p23.png', '/default/p24.png',
    '/default/p25.png', '/default/p26.png', '/default/p27.png', '/default/p28.png',
    '/default/p29.png', '/default/p30.png', '/default/p31.png', '/default/p32.png',
 ])

 // Callback function to handle search results
  const handleSearch = (searchResults) => {
    setLoading(true); // Set loading to true when search starts
    // Simulate async operation (e.g., API call)
    setTimeout(() => {
      setImages(searchResults); // Update images with search results
      setLoading(false); // Set loading to false when done
    }, 1000); // Simulated delay
  };
  return (
    <div className="container mx-auto px-4">
      <div>
        <h1 className="text-[70px] text-center text-red-200 font-extrabold drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
          <span className="text-[80px] text-black">"</span>Want to fuck{" "}
          <span className="text-red-500">HOT</span> chicks{" "}
          <span className="text-[80px] text-black">"</span>
        </h1>
      </div>

     
<SearchBox setTheImages={handleSearch} />
     {loading ?   <Loader/> : null }

     
      <Carousel  images={images}/>
      <div className="flex justify-center mt-10">
        <Link to="/register">
          <Button text={"Start Fucking"} />
        </Link>
      </div>

      
    </div>
  );
}
