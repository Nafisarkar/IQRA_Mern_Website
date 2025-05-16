import React, { useEffect } from "react";

import p1 from "../../assets/wallposts/p1.webp";
import p2 from "../../assets/wallposts/p2.webp";
import p3 from "../../assets/wallposts/p3.webp";
import p4 from "../../assets/wallposts/p4.webp";
import p5 from "../../assets/wallposts/p5.webp";
import p6 from "../../assets/wallposts/p6.webp";
import p7 from "../../assets/wallposts/p3.webp";
import p8 from "../../assets/wallposts/p4.webp";
import p9 from "../../assets/wallposts/p5.webp";
import p10 from "../../assets/wallposts/p6.webp";

const Imagecarousal = () => {
  const [currentSlide, setCurrentSlide] = React.useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === display_images.length ? 1 : prevSlide + 1
      );
    }, 9000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const display_images = [
    { id: 1, img: p1 },
    { id: 2, img: p2 },
    { id: 3, img: p3 },
    { id: 4, img: p4 },
    { id: 5, img: p5 },
    { id: 6, img: p6 },
    { id: 7, img: p7 },
    { id: 8, img: p8 },
    { id: 9, img: p9 },
    { id: 10, img: p10 },
  ];

  return (
    <div className="carousel m-4 rounded-[5px] shadow-xl">
      {display_images.map((image) => (
        <div
          key={`slide${image.id}`}
          className={`carousel-item relative w-full ${
            currentSlide === image.id ? "block" : "hidden"
          }`}
        >
          <img src={image.img} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Imagecarousal;
