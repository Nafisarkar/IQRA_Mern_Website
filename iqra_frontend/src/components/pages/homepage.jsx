import React from "react";
import Imagecarousal from "../ui/imagecarousel";
import Timetable from "../ui/timetable";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center">
      <Imagecarousal />
      <Timetable />
    </div>
  );
};

export default Homepage;
