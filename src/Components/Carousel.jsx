import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Carousel({images}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const images = [
  //   '/default/p1.jpg', '/default/p2.jpg', '/default/p3.jpg', '/default/p4.png',
  //   '/default/p5.png', '/default/p6.png', '/default/p7.png', '/default/p8.png',
  //   '/default/p9.png', '/default/p10.png', '/default/p11.png', '/default/p12.png',
  //   '/default/p13.png', '/default/p14.png', '/default/p15.png', '/default/p16.png',
  //   '/default/p17.png', '/default/p18.png', '/default/p19.png', '/default/p20.png',
  //   '/default/p21.png', '/default/p22.png', '/default/p23.png', '/default/p24.png',
  //   '/default/p25.png', '/default/p26.png', '/default/p27.png', '/default/p28.png',
  //   '/default/p29.png', '/default/p30.png', '/default/p31.png', '/default/p32.png',
  // ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Choose your poison</h1>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="p-2">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => openModal(image)}
            />
          </div>
        ))}
      </Slider>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-4 max-w-3xl w-full mx-4">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
              onClick={closeModal}
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}