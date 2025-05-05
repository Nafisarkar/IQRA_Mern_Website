import React, { useEffect } from "react";

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
    {
      id: 1,
      img: "https://placehold.co/800x400/000000/FFFFFF/png",
    },
    {
      id: 2,
      img: "https://placehold.co/800x400",
    },
    {
      id: 3,
      img: "https://placehold.co/800x400/000000/FFFFFF/png",
    },
    {
      id: 4,
      img: "https://placehold.co/800x400",
    },
  ];

  return (
    <div className="carousel m-4 rounded-[5px]">
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
